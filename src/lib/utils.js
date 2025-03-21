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

export function delayForSeconds(length, value) {
  return delay(length * 1000, value);
}

export function delayForMinutes(length, value) {
  return delay(length * 60 * 1000, value);
}

export function getSettings() {
  return new Promise((res, rej) => {
    chrome?.storage?.local
      .get("settings")
      .then(({ settings = defaultSettings }) => res(settings))
      .catch(rej);
  });
}

/**
 *
 * @param {chrome.runtime.Port} port
 * @param {object} message
 * @returns
 */

export function postPortMessage(port, data) {
  return new Promise((resolve) => {
    const id = uuid();
    const respond = (message) => {
      try {
        if (message.id === id) {
          port.onMessage.removeListener(respond);
          resolve(message);
        }
      } catch {}
    };

    port.onMessage.addListener(respond);
    port.postMessage({
      id,
      ...data,
    });
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

export async function resizeFarmerWindow() {
  const currentWindow = await chrome?.windows?.getCurrent();

  if (
    currentWindow &&
    currentWindow.type === "popup" &&
    currentWindow.state === "maximized"
  ) {
    const settings = await getSettings();
    const position = settings.farmerPosition || defaultSettings.farmerPosition;
    const width = Math.max(
      300,
      Math.floor(
        currentWindow.width /
          (settings.farmersPerWindow || defaultSettings.farmersPerWindow)
      )
    );

    const left = Math.max(1, Math.floor(position * width) - width);

    chrome?.windows?.update(currentWindow.id, {
      state: "normal",
      width,
      left,
    });
  }
}

export async function maximizeFarmerWindow() {
  const currentWindow = await chrome?.windows?.getCurrent();

  if (currentWindow && currentWindow.type === "popup") {
    chrome?.windows?.update(currentWindow.id, {
      state: "maximized",
    });
  }
}
