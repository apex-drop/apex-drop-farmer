import useFarmerContext from "@/hooks/useFarmerContext";

export default function useBlumApi() {
  return useFarmerContext().api;
}
