import axios from "axios";
import defaultSettings from "@/default-settings";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function uuid() {
  return uuidv4();
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

export function fetchContent(url, ...options) {
  return axios.get(url, ...options).then((res) => res.data);
}

export async function getDropMainScript(url, name = "index") {
  const htmlResponse = await fetchContent(url);

  const parser = new DOMParser();
  const html = parser.parseFromString(htmlResponse, "text/html");

  const scripts = html.querySelectorAll("script");

  const indexScript = Array.prototype.find.call(
    scripts,
    (script) => script.type === "module" && script.src.includes(name)
  );

  if (!indexScript) return;

  const scriptUrl = new URL(indexScript.getAttribute("src"), url);
  const scriptResponse = await fetchContent(scriptUrl);

  return scriptResponse;
}
