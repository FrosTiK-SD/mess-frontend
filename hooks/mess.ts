import { messQueryKey } from "@/constants/tanstackQuery";
import { API_ENDPOINT } from "@/constants/utils";
import { Mess } from "@/types/mess";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useGetAllMesses() {
  return useQuery({
    queryKey: [messQueryKey],
    queryFn: async () =>
      (await axios.get<{ messes: Array<Mess> }>(`${API_ENDPOINT}/messes`)).data
        .messes,
  });
}

export function useCreateMessMutation() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, Mess>({
    mutationFn: (mess) => axios.post(`${API_ENDPOINT}/messes`, mess),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [messQueryKey], exact: true });
    },
  });
}
