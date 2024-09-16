/** Update Location Hash */
if (location.hash.includes("tgWebAppPlatform=web")) {
  location.hash = location.hash.replace(
    "tgWebAppPlatform=web",
    "tgWebAppPlatform=android"
  );
}
