import TapCatIcon from "../assets/images/icon.png?format=webp";

export default function TapCatAuthDetect() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 grow">
      <img
        src={TapCatIcon}
        alt="TapCat Farmer"
        className="w-16 h-16 rounded-full"
      />
      <h3 className="font-bold text-center">Detecting Auth...</h3>
      <p className="text-center text-black">
        Try switching between sections back and forth.
      </p>
    </div>
  );
}
