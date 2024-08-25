import { API_ENDPOINT } from "@/constants/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useBatchCreateHostelAllotmentsMutation() {
  return useMutation<
    unknown,
    Error,
    { semester: string; hostel: string; users: Array<string> }
  >({
    mutationFn: (hostelAllotments) =>
      axios.post(`${API_ENDPOINT}/hostelAllotments/batch`, hostelAllotments),
  });
}
