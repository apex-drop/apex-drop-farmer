import PumpadIcon from "../assets/images/icon.png";

export default function PumpadAuthDetect() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 grow">
      <img src={PumpadIcon} alt="Pumpad Farmer" className="w-16 h-16" />
      <h3 className="font-bold text-center">Detecting Auth...</h3>
      <p className="text-center text-neutral-500">
        Try switching to the lottery or quest section back and forth.
      </p>
    </div>
  );
}
