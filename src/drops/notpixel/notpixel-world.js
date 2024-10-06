/** Extract Game IDs */
document.addEventListener("readystatechange", () => {
  if (document.readyState === "interactive") {
    const indexScript = Array.prototype.find.call(
      document.scripts,
      (script) => script.type === "module" && script.src.includes("index")
    );

    if (indexScript) {
      fetch(indexScript.src)
        .then((res) => res.text())
        .then((text) => {
          try {
            let items = text.match(/this\.items=\[([^\]]+)]/)?.[1];
            let obj = items
              .matchAll(/{[^}]+}/g)
              .toArray()
              .map((item) => {
                const match = item[0];
                // X
                let x = match
                  .match(/x:([^,]+),/)?.[1]
                  ?.replaceAll(/[^\d-]/g, "");

                // Y
                let y = match
                  .match(/y:([^,]+),/)?.[1]
                  ?.replaceAll(/[^\d-]/g, "");

                // Size
                let size = match
                  .match(/size:([^,]+),/)?.[1]
                  ?.replaceAll(/[^\d-]/g, "");

                // Image
                let imageVariable = match.match(/image:([^,]+),/)?.[1];
                let image = text.match(
                  new RegExp(`${imageVariable}="/assets/([^"]+)"`)
                )?.[1];

                return {
                  x: parseInt(x),
                  y: parseInt(y),
                  size: parseInt(size),
                  image: `/assets/${image}`,
                };
              });

            document.documentElement.dataset.notpixel = JSON.stringify(obj);
          } catch {}
        });
    }
  }
});
