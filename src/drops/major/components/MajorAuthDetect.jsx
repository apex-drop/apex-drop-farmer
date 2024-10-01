import MajorIcon from "../assets/images/icon.png?format=webp";

export default function MajorAuthDetect() {
  return (
    <div className="flex flex-col items-center justify-center min-w-0 min-h-0 gap-4 p-4 grow">
      <img
        src={MajorIcon}
        alt="Major Farmer"
        className="w-16 h-16 rounded-full"
      />
      <h3 className="font-bold text-center">Detecting Auth...</h3>
      <p className="text-center text-neutral-500">
        Try switching between sections back and forth.
      </p>
    </div>
  );
}
