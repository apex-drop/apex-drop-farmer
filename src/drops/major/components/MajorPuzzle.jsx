import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import MajorFullscreenSpinner from "./MajorFullscreenSpinner";
import MajorGameButton from "./MajorGameButton";
import MajorPuzzleDialog from "./MajorPuzzleDialog";
import PuzzleDurovIcon from "../assets/images/puzzle-durov.svg";
import useMajorApi from "../hooks/useMajorApi";
import useMajorGameErrorHandler from "../hooks/useMajorGameErrorHandler";
import useMajorUserQuery from "../hooks/useMajorUserQuery";

export default function MajorPuzzle() {
  const [showModal, setShowModal] = useState(false);
  const userQuery = useMajorUserQuery();
  const api = useMajorApi();
  const handleError = useMajorGameErrorHandler();

  const startMutation = useMutation({
    retry(failureCount, e) {
      return !e.response?.data?.detail?.["blocked_until"];
    },
    mutationKey: ["major", "puzzle-durov", "start"],
    mutationFn: () =>
      api.get("https://major.bot/api/durov/").then((res) => res.data),
  });

  const claimMutation = useMutation({
    mutationKey: ["major", "puzzle-durov", "claim"],
    mutationFn: (data) =>
      api.post("https://major.bot/api/durov/", data).then((res) => res.data),
  });

  const handleButtonClick = () => {
    startMutation
      .mutateAsync()
      .then(() => {
        setShowModal(true);
      })
      .catch(handleError);
  };

  const handleChoiceSubmit = (data) => {
    setShowModal(false);

    claimMutation.mutateAsync(data).then(({ correct }) => {
      if (correct.length === 4) {
        /** Correct */
        toast
          .success("Claimed Successfully!", {
            className: "font-bold font-sans",
          })
          .then(userQuery.refetch);
      } else {
        /** Failed */
        toast
          .error("Incorrect choices!", {
            className: "font-bold font-sans",
          })
          .then(userQuery.refetch);
      }
    });
  };

  return (
    <>
      <MajorGameButton
        icon={PuzzleDurovIcon}
        title={"Puzzle Durov"}
        reward={5000}
        onClick={handleButtonClick}
      />

      {startMutation.isPending || claimMutation.isPending ? (
        <MajorFullscreenSpinner />
      ) : null}

      {showModal ? (
        <MajorPuzzleDialog
          onSubmit={handleChoiceSubmit}
          onOpenChange={(open) => setShowModal(open)}
        />
      ) : null}
    </>
  );
}
