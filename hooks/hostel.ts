import { hostelsQueryKey } from "@/constants/tanstackQuery";
import { API_ENDPOINT } from "@/constants/utils";
import type { Hostel } from "@/types/hostel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useGetHostelsQuery() {
  return useQuery<Array<Hostel>>({
    queryKey: [hostelsQueryKey],
    queryFn: async () => {
      return (
        await axios.get<{ hostels: Array<Hostel> }>(`${API_ENDPOINT}/hostels`)
      ).data.hostels;
    },
  });
}

export function useCreateHostelMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, Error, Hostel>({
    mutationFn: (newHostel) => {
      return axios.post<Hostel>(`${API_ENDPOINT}/hostels`, newHostel);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [hostelsQueryKey],
        exact: true,
      });
    },
  });
}

export function useUpdateHostelMutation() {
  const queryClient = useQueryClient();

  return useMutation<any, Error, Hostel>({
    mutationFn: (updatedHostel) => {
      return axios.put<Hostel>(
        `${API_ENDPOINT}/hostels/${updatedHostel._id}`,
        updatedHostel,
      );
    },
    onSuccess: (_, updatedHostel) => {
      queryClient.invalidateQueries({
        queryKey: [hostelsQueryKey],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: [hostelsQueryKey, updatedHostel._id],
        exact: true,
      });
    },
  });
}

export function useGetHostelById(hostelId: string) {
  return useQuery({
    queryKey: [hostelsQueryKey, hostelId],
    queryFn: async () => {
      return (
        await axios.get<{ hostel: Hostel }>(
          `${API_ENDPOINT}/hostels/${hostelId}`,
        )
      ).data.hostel;
    },
  });
}

// export function useGetHostelPopulatedById(hostelId: string) {
//   return useQuery({
//     queryKey: [hostelsQueryKey, hostelId],
//     queryFn: async () => {
//       return (
//         await axios.get<{ hostel: Hostel }>(
//           `${AUTH_SERVER_DOMAIN}/admin/populatedHostels/${hostelId}`,
//         )
//       ).data.hostel;
//     },
//   });
// }
