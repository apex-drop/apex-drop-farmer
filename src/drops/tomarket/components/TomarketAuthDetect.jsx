import TomarketIcon from "../assets/images/icon.png?format=webp";

export default function TomarketAuthDetect() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 grow">
      <img src={TomarketIcon} alt="Tomarket Farmer" className="w-16 h-16" />
      <h3 className="font-bold text-center">Detecting Auth...</h3>
      <p className="text-center text-gray-400">
        Try switching to the earn or frens section back and forth.
      </p>
    </div>
  );
}
