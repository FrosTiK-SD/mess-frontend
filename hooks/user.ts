import { API_ENDPOINT } from "@/constants/utils";
import { AppUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export async function FetchUserByRollNo(rollNo: number) {
  return (
    await axios.get<{ user: AppUser }>(`${API_ENDPOINT}/rollNo/${rollNo}/user`)
  ).data.user;
}

export function useGetCachedCurrentUser() {
  return useQuery<AppUser | undefined>({
    queryKey: ["currentUser"],
  });
}
