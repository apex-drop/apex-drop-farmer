export default function AuthDetect() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh gap-4">
      <img src="/icon.png" alt="Blum Farmer" className="w-16 h-16" />
      <h3 className="font-bold">Detecting Auth...</h3>
      <p className="text-gray-400">
        Try switching to the tasks or frens section back and forth.
      </p>
    </div>
  );
}
