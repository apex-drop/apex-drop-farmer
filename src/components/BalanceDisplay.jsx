import TicketIcon from "@/assets/ticket.webp";
import useBalanceQuery from "@/hooks/useBalanceQuery";

export default function BalanceDisplay() {
  const query = useBalanceQuery();

  return (
    <div className="py-4 text-center">
      {query.isPending ? (
        "Fetching balance..."
      ) : query.isSuccess ? (
        <>
          <h3 className="font-bold text-xl">{query.data.availableBalance}</h3>
          <h4 className="flex items-center justify-center gap-2">
            <img src={TicketIcon} className="h-4" /> {query.data.playPasses}
          </h4>
        </>
      ) : (
        "Error..."
      )}
    </div>
  );
}
