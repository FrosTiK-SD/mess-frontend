import { API_ENDPOINT } from "@/constants/utils";
import { HostelStaffAllotment } from "@/types/hostelStaffAllotment";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useCreateHostelStaffAllotmentMutation() {
  return useMutation<unknown, Error, HostelStaffAllotment>({
    mutationFn: (hostelStaffAllotment) =>
      axios.post(`${API_ENDPOINT}/hostelStaffAllotments`, hostelStaffAllotment),
  });
}
