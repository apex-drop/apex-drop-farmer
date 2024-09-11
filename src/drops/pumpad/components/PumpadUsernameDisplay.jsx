import usePumpadUserQuery from "../hooks/usePumpadUserQuery";

export default function PumpadUsernameDisplay() {
  const query = usePumpadUserQuery();

  return (
    <div className="py-2">
      <h4 className="text-center">
        {query.isPending
          ? "Fetching username..."
          : query.isSuccess
          ? query.data["user_name"]
          : "Error..."}
      </h4>
    </div>
  );
}
