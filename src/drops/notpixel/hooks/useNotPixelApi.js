import useFarmerContext from "@/hooks/useFarmerContext";

export default function useNotPixelApi() {
  return useFarmerContext().api;
}
