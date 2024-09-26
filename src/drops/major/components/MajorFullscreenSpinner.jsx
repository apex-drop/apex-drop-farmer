import MajorIcon from "../assets/images/icon.png?format=webp";

export default function MajorFullscreenSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
      <div className="p-4 bg-white rounded-full">
        <img src={MajorIcon} className="w-10 h-10 rounded-full animate-spin" />
      </div>
    </div>
  );
}
