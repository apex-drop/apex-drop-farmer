import Agent301Icon from "../assets/images/icon.png?format=webp";

export default function Agent301AuthDetect() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 grow">
      <img src={Agent301Icon} alt="Agent301 Farmer" className="w-16 h-16" />
      <h3 className="font-bold text-center">Detecting Auth...</h3>
      <p className="text-center text-neutral-500">
        Try switching between sections back and forth.
      </p>
    </div>
  );
}
