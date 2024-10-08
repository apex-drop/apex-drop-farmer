import { CgSpinner } from "react-icons/cg";
import { useEffect } from "react";

import NotPixelApp from "./NotPixelApp";
import useNotPixelData from "../hooks/useNotPixelData";
import useNotPixelDiff from "../hooks/useNotPixelDiff";
import useNotPixelSocket from "../hooks/useNotPixelSocket";

export default function NotPixelFarmer() {
  const {
    started,
    configureNotPixel,
    worldPixels,
    worldUpdatedAt,
    items,
    updatePixels,
  } = useNotPixelData();
  const diff = useNotPixelDiff(items, worldPixels, worldUpdatedAt);

  useNotPixelSocket(started, updatePixels);
  useEffect(() => {
    /** Get NotPixel from Message */
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

  return started ? (
    <NotPixelApp diff={diff} updatePixels={updatePixels} />
  ) : (
    <div className="flex items-center justify-center grow">
      <CgSpinner className="w-5 h-5 mx-auto animate-spin" />
    </div>
  );
}
