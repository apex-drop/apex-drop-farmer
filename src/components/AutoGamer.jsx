import Countdown from "react-countdown";
import useBalanceQuery from "@/hooks/useBalanceQuery";
import useClaimGameMutation from "@/hooks/useClaimGameMutation";
import useStartGameMutation from "@/hooks/useStartGameMutation";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import Button from "./Button";
import Input from "./Input";

const GAME_DURATION = 30 * 1000;
const EXTRA_DELAY = 3 * 1000;
const MIN_POINT = 100;
const INITIAL_POINT = 180;
const MAX_POINT = 280;

const delay = (length) =>
  new Promise((res) => {
    setTimeout(res, length);
  });

export default function () {
  const query = useBalanceQuery();
  const client = useQueryClient();

  const [autoPlaying, setAutoPlaying] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [desiredPoint, setDesiredPoint] = useState(INITIAL_POINT);

  const tickets = query.data?.playPasses || 0;
  const points = Math.max(MIN_POINT, Math.min(MAX_POINT, desiredPoint));

  const startGameMutation = useStartGameMutation();
  const claimGameMutation = useClaimGameMutation(points);

  /** Countdown renderer */
  const countdownRenderer = ({ seconds }) => (
    <span className="text-xl font-bold">{seconds}</span>
  );

  /** Handle button click */
  const handleAutoPlayClick = () => {
    setDesiredPoint(points);
    setAutoPlaying((previous) => !previous);
  };

  useEffect(() => {
    if (!autoPlaying) {
      return;
    }

    if (!tickets) {
      setAutoPlaying(false);
      return;
    }

    (async function () {
      const game = await startGameMutation.mutateAsync();

      /** Wait for countdown */
      setCountdown(Date.now() + GAME_DURATION);
      await delay(GAME_DURATION);

      /** Claim Game */
      await claimGameMutation.mutateAsync(game.gameId);

      /** Add a little delay */
      await delay(EXTRA_DELAY);

      /** Reset Mutation */
      await client.refetchQueries({
        queryKey: ["balance"],
      });
      await startGameMutation.reset();
      await claimGameMutation.reset();
    })();
  }, [autoPlaying, tickets]);

  return (
    <div className="flex flex-col gap-2">
      {tickets > 0 ? (
        <>
          <Input
            disabled={autoPlaying || !tickets}
            value={desiredPoint}
            onInput={(ev) => setDesiredPoint(ev.target.value)}
            type="number"
            min={MIN_POINT}
            max={MAX_POINT}
            placeholder={`Range (${MIN_POINT} - ${MAX_POINT})`}
          />
          <p className="text-gray-400">
            Minimum Point (automatically adds extra 1-20 points.)
          </p>
        </>
      ) : null}

      {/* Start or Stop Button  */}
      <Button
        color={autoPlaying ? "danger" : "primary"}
        disabled={!tickets}
        onClick={handleAutoPlayClick}
      >
        {autoPlaying ? "Stop" : "Start"}
      </Button>

      {autoPlaying ? (
        <div className="flex flex-col gap-2 p-4 rounded-lg bg-neutral-800">
          {/* Game Start */}
          {startGameMutation.isPending ? (
            <p className="font-bold text-yellow-500">Starting Game...</p>
          ) : startGameMutation.isError ? (
            <p className="font-bold text-red-500">Failed to start game...</p>
          ) : startGameMutation.isSuccess ? (
            <>
              <p className="font-bold text-green-500">
                GAME ID: {startGameMutation.data?.gameId}
              </p>
              <p>
                {claimGameMutation.isPending ? (
                  <span className="text-yellow-500">Claiming points...</span>
                ) : claimGameMutation.isError ? (
                  <span className="text-red-500">
                    Failed to claim points...
                  </span>
                ) : claimGameMutation.isSuccess ? (
                  <span className="font-bold text-green-500">
                    Points claimed. (Refreshing...)
                  </span>
                ) : (
                  <Countdown
                    key={countdown}
                    date={countdown}
                    renderer={countdownRenderer}
                  />
                )}
              </p>
            </>
          ) : (
            <p className="text-gray-400">Loading...</p>
          )}
        </div>
      ) : null}
    </div>
  );
}