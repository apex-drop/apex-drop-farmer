import axios from "axios";
import defaultSettings from "@/default-settings";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function delay(length, value) {
  return new Promise((res) => {
    setTimeout(() => res(value), length);
  });
}

export function getSettings() {
  return new Promise((res, rej) => {
    chrome?.storage?.local
      .get("settings")
      .then(({ settings = defaultSettings }) => res(settings))
      .catch(rej);
  });
}

export async function getDropMainScript(url) {
  const htmlResponse = await axios.get(url).then((res) => res.data);

  const parser = new DOMParser();
  const html = parser.parseFromString(htmlResponse, "text/html");

  const scripts = html.querySelectorAll("script");

  const indexScript = Array.prototype.find.call(
    scripts,
    (script) => script.type === "module" && script.src.includes("index")
  );

  if (!indexScript) return;

  const scriptUrl = new URL(indexScript.getAttribute("src"), url);
  const scriptResponse = await axios.get(scriptUrl).then((res) => res.data);

  return scriptResponse;
}
