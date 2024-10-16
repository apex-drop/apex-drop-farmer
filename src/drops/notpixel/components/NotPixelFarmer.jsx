import { CgSpinner } from "react-icons/cg";
import { useEffect } from "react";

import NotPixelApp from "./NotPixelApp";
import useNotPixelApi from "../hooks/useNotPixelApi";
import useNotPixelData from "../hooks/useNotPixelData";
import useNotPixelDiff from "../hooks/useNotPixelDiff";
import useNotPixelSocket from "../hooks/useNotPixelSocket";

export default function NotPixelFarmer({ sandboxRef }) {
  const api = useNotPixelApi();
  const {
    started,
    pixels,
    worldPixels,
    updatedAt,
    updateWorldPixels,
    configureNotPixel,
  } = useNotPixelData();
  const diff = useNotPixelDiff(pixels, worldPixels);

  /** Initiate socket */
  const { connected } = useNotPixelSocket(
    started,
    sandboxRef,
    updateWorldPixels
  );

  /** Get NotPixel */
  useEffect(() => {
    (async function () {
      let items = [];

      try {
        const myTemplate = await api
          .get("https://notpx.app/api/v1/image/template/my")
          .then((res) => res.data);

        items = [
          {
            x: myTemplate.x,
            y: myTemplate.y,
            size: myTemplate.imageSize,
            url: myTemplate.url,
          },
        ];
      } catch {}

      /** Configure the App */
      configureNotPixel(items);
    })();
  }, [configureNotPixel]);

  return (
    <>
      {connected ? (
        <NotPixelApp diff={diff} updatedAt={updatedAt} />
      ) : (
        <div className="flex items-center justify-center grow">
          <CgSpinner className="w-5 h-5 mx-auto animate-spin" />
        </div>
      )}
    </>
  );
}
