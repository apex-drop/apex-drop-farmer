import { getDropMainScript } from "@/lib/utils";

export async function getSignInKey() {
  const scriptResponse = await getDropMainScript("https://www.yescoin.gold");

  const match = scriptResponse.match(/"([^"]+)"[^"]+\.signInType/);

  return match[1];
}
