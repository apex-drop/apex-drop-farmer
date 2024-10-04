import HrumTaskButton from "./HrumTaskButton";
import RiddleIcon from "../assets/images/riddle.jpg";

export default function HrumRiddleTask() {
  return (
    <HrumTaskButton
      icon={RiddleIcon}
      title={"Riddle Of The Day"}
      reward={150}
    />
  );
}
