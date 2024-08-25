import {
  hostelsQueryKey,
  hostelStaffAllotmentsQueryKey,
} from "@/constants/tanstackQuery";
import { API_ENDPOINT } from "@/constants/utils";
import {
  HostelStaffAllotment,
  HostelStaffAllotmentWithUser,
} from "@/types/hostelStaffAllotment";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCreateHostelStaffAllotmentMutation() {
  return useMutation<unknown, Error, HostelStaffAllotment>({
    mutationFn: (hostelStaffAllotment) =>
      axios.post(`${API_ENDPOINT}/hostelStaffAllotments`, hostelStaffAllotment),
  });
}

export function useGetHostelStaffAllotmentsWithUser(hostelId: string) {
  return useQuery({
    queryKey: [hostelsQueryKey, hostelId, hostelStaffAllotmentsQueryKey],
    queryFn: async () =>
      (
        await axios.get<{
          hostelStaffAllotments: Array<HostelStaffAllotmentWithUser>;
        }>(`${API_ENDPOINT}/hostels/${hostelId}/hostelStaffAllotments`)
      ).data.hostelStaffAllotments,
  });
}
