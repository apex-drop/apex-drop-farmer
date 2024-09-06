import useUserQuery from "@/hooks/useUserQuery";

export default function UsernameDisplay() {
  const query = useUserQuery();

  return (
    <div className="py-2">
      <h4 className="text-center">
        {query.isPending
          ? "Fetching username..."
          : query.isSuccess
          ? query.data.username
          : "Error..."}
      </h4>
    </div>
  );
}
