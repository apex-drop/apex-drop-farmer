import GoatsIcon from "../assets/images/icon.png?format=webp";

export default function GoatsAuthDetect() {
  return (
    <div className="flex flex-col items-center justify-center min-w-0 min-h-0 gap-4 p-4 grow">
      <img src={GoatsIcon} alt="Goats Farmer" className="w-16 h-16" />
      <h3 className="font-bold text-center">Detecting Auth...</h3>
      <p className="text-center text-neutral-500">
        Try switching between sections back and forth.
      </p>
    </div>
  );
}
