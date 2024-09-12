import { CgSpinner } from "react-icons/cg";
import { createPortal } from "react-dom";
export default function MajorFullscreenSpinner() {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="p-4 bg-white rounded-lg">
        <CgSpinner className="w-5 h-5 animate-spin" />
      </div>
    </div>,
    document.body
  );
}
