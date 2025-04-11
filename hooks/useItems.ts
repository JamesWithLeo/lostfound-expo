import { api } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";

export function useItems({ type, id }: { type: "lost" | "found"; id: string }) {
  if (!id) return;
  return useQuery({
    queryKey: ["items", type],
    queryFn: async () => {
      const res = await fetch(`${api}/items/${id}?type=${type}`);
      if (!res.ok) throw new Error(`Failed to fetch ${type} items.`);
      return res.json();
    },
  });
}
