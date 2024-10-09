import rgbHex from "rgb-hex";
import { getDropMainScript } from "@/lib/utils";

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", reject);

    image.src = src;
  });
}

export function imageDataToHexCallback(data, callback) {
  let result = [];

  for (let i = 0; i < data.length; i += 4) {
    let [r, g, b, a] = [data[i + 0], data[i + 1], data[i + 2], data[i + 3]];

    result.push(callback(rgbToHex(r, g, b)));
  }

  return result;
}

export function imageDataToHex(data) {
  return imageDataToHexCallback(data, (color) => color);
}

export function imageDataToPixel(data) {
  return imageDataToHexCallback(data, (color) => ({
    color,
    updatedAt: Date.now(),
  }));
}

export function rgbToPixel(...args) {
  return {
    color: rgbToHex(...args),
    updatedAt: Date.now(),
  };
}
export function rgbToHex(...args) {
  return "#" + rgbHex(...args).toUpperCase();
}

export function getCoords(index, item) {
  let x = index % item.size;
  let y = Math.floor(index / item.size);

  let positionX = item.x + x;
  let positionY = item.y + y;

  let offset = positionY * 1000 + positionX;

  return {
    x,
    y,
    positionX,
    positionY,
    offset,
  };
}

export async function getNotPixelGame() {
  const scriptResponse = await getDropMainScript("https://app.notpx.app");

  try {
    let items = scriptResponse.match(/this\.items=\[([^\]]+)]/)?.[1];
    let obj = items
      .matchAll(/{[^}]+}/g)
      .toArray()
      .map((item) => {
        const match = item[0];
        // X
        let x = match.match(/x:([^,]+),/)?.[1]?.replaceAll(/[^\d-]/g, "");

        // Y
        let y = match.match(/y:([^,]+),/)?.[1]?.replaceAll(/[^\d-]/g, "");

        // Size
        let size = match.match(/size:([^,]+),/)?.[1]?.replaceAll(/[^\d-]/g, "");

        // Image
        let imageVariable = match.match(/image:([^,]+),/)?.[1];
        let image = scriptResponse.match(
          new RegExp(`${imageVariable}="/assets/([^"]+)"`)
        )?.[1];

        return {
          x: parseInt(x),
          y: parseInt(y),
          size: parseInt(size),
          image: `/assets/${image}`,
        };
      });

    return obj;
  } catch {}
}
