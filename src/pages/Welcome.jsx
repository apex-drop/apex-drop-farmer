import AppIcon from "@/assets/images/icon.png";
import BlumIcon from "@/drops/blum/assets/icon.png";
import { Link } from "react-router-dom";

const drops = [
  {
    title: "Blum",
    path: "/blum",
    icon: BlumIcon,
  },
];

export default function Welcome() {
  return (
    <div className="flex flex-col justify-center gap-4 p-4 mx-auto min-h-dvh max-w-96">
      <img src={AppIcon} className="mx-auto w-28 h-28" />
      <h3 className="text-lg font-bold text-center">Apex Drop Farmer</h3>

      {drops.map((drop, index) => (
        <Link
          key={index}
          to={drop.path}
          className="flex items-center gap-2 p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200"
        >
          <img src={drop.icon} className="w-10 h-10 rounded-full shrink-0" />
          <h3 className="min-w-0">{drop.title}</h3>
        </Link>
      ))}

      <div className="flex flex-col items-center gap-2 text-xs">
        <a
          href="https://t.me/Apex_Drop"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          Join Channel
        </a>
        <a
          href="https://wa.me/2349018646163"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          Chat with Dev
        </a>
      </div>
    </div>
  );
}
