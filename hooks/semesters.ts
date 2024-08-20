import { sessionsQueryKey } from "@/constants/tanstackQuery";
import { API_ENDPOINT } from "@/constants/utils";
import { Semester } from "@/types/semester";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetAllSemesters() {
  return useQuery({
    queryKey: [sessionsQueryKey],
    queryFn: async () => {
      return (
        await axios.get<{ semesters: Array<Semester> }>(
          `${API_ENDPOINT}/semesters`,
        )
      ).data.semesters;
    },
  });
}
