import CoinIcon from "../assets/images/coin.png?format=webp";
import TicketsIcon from "../assets/images/tickets.png?format=webp";
import useTapCatProfileQuery from "../hooks/useTapCatProfileQuery";

export default function TapCatProfileDisplay() {
  const query = useTapCatProfileQuery();

  return (
    <>
      {query.isPending ? (
        <h4 className="text-center">Fetching Profile...</h4>
      ) : query.isError ? (
        <h4 className="text-center text-orange-500">
          Error Fetching Profile...
        </h4>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="font-bold text-center text-black">
            {query.data["name"]}
          </h2>
          <h3 className="text-2xl font-bold text-center">
            <img src={CoinIcon} className="inline w-5 h-5" />{" "}
            {Intl.NumberFormat().format(query.data["total_points"])}
          </h3>

          <p className="px-4 py-2 text-center rounded-full bg-rose-600">
            <img src={TicketsIcon} className="inline w-4 h-4" />{" "}
            {query.data["playing_tickets_amount"]}
          </p>
        </div>
      )}
    </>
  );
}
