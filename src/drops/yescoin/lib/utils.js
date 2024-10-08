import axios from "axios";

export async function getSignInKey() {
  const { yescoin } = await chrome?.storage?.local.get("yescoin");

  if (yescoin) {
    return yescoin;
  }

  /** Fetch HTML */
  const htmlResponse = await axios
    .get("https://www.yescoin.gold")
    .then((res) => res.data);

  const parser = new DOMParser();
  const html = parser.parseFromString(htmlResponse, "text/html");

  const scripts = html.querySelectorAll("script");

  const indexScript = Array.prototype.find.call(
    scripts,
    (script) => script.type === "module" && script.src.includes("index")
  );

  if (!indexScript) return;

  const scriptUrl = new URL(
    indexScript.getAttribute("src"),
    "https://www.yescoin.gold"
  );
  const scriptResponse = await axios.get(scriptUrl).then((res) => res.data);

  const match = scriptResponse.match(/"([^"]+)"[^"]+\.signInType/);

  if (match) {
    await chrome?.storage?.local.set({
      yescoin: match[1],
    });

    return match[1];
  }
}
