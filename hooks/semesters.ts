import { semestersQueryKey } from "@/constants/tanstackQuery";
import { API_ENDPOINT } from "@/constants/utils";
import { Semester } from "@/types/semester";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export function useGetAllSemesters() {
  return useQuery({
    queryKey: [semestersQueryKey],
    queryFn: async () => {
      return (
        await axios.get<{ semesters: Array<Semester> }>(
          `${API_ENDPOINT}/semesters`,
        )
      ).data.semesters;
    },
  });
}

export function useCreateSemesterMutation() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, Semester>({
    mutationFn: (semester) => {
      return axios.post<Semester>(`${API_ENDPOINT}/semesters`, semester);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [semestersQueryKey],
        exact: true,
      });
    },
  });
}

export function useGetChosenSemester() {
  return useSearchParams().get("semester");
}
