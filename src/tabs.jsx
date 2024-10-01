import Agent301 from "@/drops/agent301/Agent301";
import Agent301Icon from "@/drops/agent301/assets/images/icon.png?format=webp&w=80";
import AppIcon from "@/assets/images/icon-wrapped.png?format=webp&w=80";
import Blum from "@/drops/blum/Blum";
import BlumIcon from "@/drops/blum/assets/images/icon.png?format=webp&w=80";
import Goats from "@/drops/goats/Goats";
import GoatsIcon from "@/drops/goats/assets/images/icon.png?format=webp&w=80";
import Major from "@/drops/major/Major";
import MajorIcon from "@/drops/major/assets/images/icon.png?format=webp&w=80";
import Pumpad from "@/drops/pumpad/Pumpad";
import PumpadIcon from "@/drops/pumpad/assets/images/icon.png?format=webp&w=80";
import Slotcoin from "@/drops/slotcoin/Slotcoin";
import SlotcoinIcon from "@/drops/slotcoin/assets/images/icon.png?format=webp&w=80";
import TapCat from "@/drops/tapcat/TapCat";
import TapCatIcon from "@/drops/tapcat/assets/images/icon.png?format=webp&w=80";
import TelegramWeb from "@/TelegramWeb";
import TelegramWebAIcon from "@/assets/images/telegram-web-a.png?format=webp&w=80";
import TelegramWebKIcon from "@/assets/images/telegram-web-k.png?format=webp&w=80";
import Tomarket from "@/drops/tomarket/Tomarket";
import TomarketIcon from "@/drops/tomarket/assets/images/icon.png?format=webp&w=80";
import Truecoin from "@/drops/truecoin/Truecoin";
import TruecoinIcon from "@/drops/truecoin/assets/images/icon.png?format=webp&w=80";
import Welcome from "@/Welcome";

const tabs = [
  {
    id: "apex-drop-farmer",
    title: "Apex Drop Farmer",
    icon: AppIcon,
    component: <Welcome />,
  },
  {
    id: "telegram-web-k",
    title: "Telegram WebK",
    icon: TelegramWebKIcon,
    component: <TelegramWeb version="k" />,
  },
  {
    id: "telegram-web-a",
    title: "Telegram WebA",
    icon: TelegramWebAIcon,
    component: <TelegramWeb version="a" />,
  },
  {
    id: "major",
    title: "Major",
    icon: MajorIcon,
    component: <Major />,
  },
  {
    title: "Blum",
    id: "blum",
    icon: BlumIcon,
    component: <Blum />,
  },
  {
    title: "Tomarket",
    id: "tomarket",
    icon: TomarketIcon,
    component: <Tomarket />,
  },
  {
    title: "Pumpad",
    id: "pumpad",
    icon: PumpadIcon,
    component: <Pumpad />,
  },
  {
    title: "Slotcoin",
    id: "slotcoin",
    icon: SlotcoinIcon,
    component: <Slotcoin />,
  },
  {
    title: "Agent 301",
    id: "agent301",
    icon: Agent301Icon,
    component: <Agent301 />,
  },
  {
    title: "Tap Cat",
    id: "tapcat",
    icon: TapCatIcon,
    component: <TapCat />,
  },
  {
    title: "Goats",
    id: "goats",
    icon: GoatsIcon,
    component: <Goats />,
  },
  {
    title: "Truecoin",
    id: "truecoin",
    icon: TruecoinIcon,
    component: <Truecoin />,
  },
];

export default tabs;
