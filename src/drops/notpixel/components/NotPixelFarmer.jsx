import { CgSpinner } from "react-icons/cg";
import { useEffect } from "react";

import NotPixelApp from "./NotPixelApp";
import useNotPixelData from "../hooks/useNotPixelData";
import useNotPixelDiff from "../hooks/useNotPixelDiff";
import useNotPixelSocket from "../hooks/useNotPixelSocket";

export default function NotPixelFarmer() {
  const { started, pixels, worldPixels, updateWorldPixels, configureNotPixel } =
    useNotPixelData();
  const diff = useNotPixelDiff(pixels, worldPixels);

  /** Initiate socket */
  const { connected } = useNotPixelSocket(started, updateWorldPixels);

  /** Get NotPixel from Message */
  useEffect(() => {
    const getNotPixel = (message, sender, sendResponse) => {
      if (message.action === "set-notpixel") {
        /** Return a Response */
        sendResponse({
          status: true,
        });

        /** Configure the App */
        configureNotPixel(message.data.notpixel);

        /** Remove Listener */
        chrome?.runtime?.onMessage.removeListener(getNotPixel);
      }
    };

    /** Add Listener */
    chrome?.runtime?.onMessage.addListener(getNotPixel);

    return () => {
      /** Remove Listener */
      chrome?.runtime?.onMessage.removeListener(getNotPixel);
    };
  }, [configureNotPixel]);

  return connected ? (
    <NotPixelApp diff={diff} updateWorldPixels={updateWorldPixels} />
  ) : (
    <div className="flex items-center justify-center grow">
      <CgSpinner className="w-5 h-5 mx-auto animate-spin" />
    </div>
  );
}
