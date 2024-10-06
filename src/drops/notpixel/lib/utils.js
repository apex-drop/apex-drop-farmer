import rgbHex from "rgb-hex";

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", reject);

    image.src = src;
  });
}

export function imageDataToHex(data) {
  let result = [];

  for (let i = 0; i < data.length; i += 4) {
    let [r, g, b, a] = [data[i + 0], data[i + 1], data[i + 2], data[i + 3]];

    result.push("#" + rgbHex(r, g, b).toUpperCase());
  }

  return result;
}
