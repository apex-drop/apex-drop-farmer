import { CgSpinner } from "react-icons/cg";
import { useEffect } from "react";

import NotPixelApp from "./NotPixelApp";
import useNotPixelData from "../hooks/useNotPixelData";
import useNotPixelDiff from "../hooks/useNotPixelDiff";
import useNotPixelSocket from "../hooks/useNotPixelSocket";
import { getNotPixelGame } from "../lib/utils";

export default function NotPixelFarmer() {
  const { started, pixels, worldPixels, updateWorldPixels, configureNotPixel } =
    useNotPixelData();
  const diff = useNotPixelDiff(pixels, worldPixels);

  /** Initiate socket */
  const { connected } = useNotPixelSocket(started, updateWorldPixels);

  /** Get NotPixel */
  useEffect(() => {
    (async function () {
      const game = await getNotPixelGame();

      /** Configure the App */
      configureNotPixel(game);
    })();
  }, [configureNotPixel]);

  return connected ? (
    <NotPixelApp diff={diff} updateWorldPixels={updateWorldPixels} />
  ) : (
    <div className="flex items-center justify-center grow">
      <CgSpinner className="w-5 h-5 mx-auto animate-spin" />
    </div>
  );
}
