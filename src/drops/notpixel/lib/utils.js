import rgbHex from "rgb-hex";

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
