export default function FarmerHeader() {
  return (
    <div className="flex flex-col gap-1 py-4 border-b border-gray-500">
      <div className="flex items-center justify-center">
        <img src="/icon.png" alt="Blum Farmer" className="w-8 h-8" />
        <h1 className="font-bold">Blum Farmer</h1>
      </div>
      <p className="text-center">
        <a
          href="https://wa.me/2349018646163"
          target="_blank"
          className="text-green-500"
        >
          Sadiq Salau
        </a>
      </p>
    </div>
  );
}
