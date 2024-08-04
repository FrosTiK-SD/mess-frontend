import { hostelsQueryKey } from "@/constants/tanstackQuery";
import { AUTH_SERVER_DOMAIN } from "@/constants/utils";
import { Hostel, HostelPopulated } from "@/types/hostel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface FetchQueryOptions {
  withQueryFunction: boolean;
}

export const defaultFetchQueryOptions: FetchQueryOptions = {
  withQueryFunction: true,
};

export function useGetHostelsQuery({ withQueryFunction }: FetchQueryOptions) {
  return useQuery<Array<Hostel>>({
    queryKey: [hostelsQueryKey],
    queryFn: !withQueryFunction
      ? undefined
      : async () => {
          return (
            await axios.get<{ hostels: Array<Hostel> }>(
              `${AUTH_SERVER_DOMAIN}/admin/hostels`,
            )
          ).data.hostels;
        },
  });
}

export function useCreateHostelMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, Error, Hostel>({
    mutationFn: (newHostel) => {
      return axios.post<Hostel>(
        `${AUTH_SERVER_DOMAIN}/admin/hostels`,
        newHostel,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [hostelsQueryKey],
        exact: true,
      });
    },
  });
}

export function useGetHostelPopulatedById(
  hostelId: string,
  { withQueryFunction }: FetchQueryOptions,
) {
  return useQuery({
    queryKey: [hostelsQueryKey, hostelId],
    queryFn: !withQueryFunction
      ? undefined
      : async () => {
          return (
            await axios.get<{ hostel: HostelPopulated }>(
              `${AUTH_SERVER_DOMAIN}/admin/populatedHostels/${hostelId}`,
            )
          ).data.hostel;
        },
  });
}
