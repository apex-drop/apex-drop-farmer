import MajorIcon from "../assets/images/icon.png";

export default function MajorAuthDetect() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 grow">
      <img
        src={MajorIcon}
        alt="Major Farmer"
        className="w-16 h-16 rounded-full"
      />
      <h3 className="font-bold text-center">Detecting Auth...</h3>
      <p className="text-center text-neutral-500">
        Try switching to the games or top section back and forth.
      </p>
    </div>
  );
}