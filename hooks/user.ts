import { Role } from "@/constants/permissions";
import { userQueryKey } from "@/constants/tanstackQuery";
import { API_ENDPOINT } from "@/constants/utils";
import { AppUser, UserFilter } from "@/types/user";
import { DeepReadonly } from "@/types/util";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export function useGetAllCaretakers() {
  return useQuery({
    queryKey: ["caretakers"],
    queryFn: async () =>
      (
        await axios.get<{ caretakers: Array<AppUser> }>(
          `${API_ENDPOINT}/caretakers`,
        )
      ).data.caretakers,
  });
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    Error,
    Partial<AppUser> & { email: string; role: Role }
  >({
    mutationFn: (user) => axios.post(`${API_ENDPOINT}/user`, user),
  });
}

export function useGetFilteredUsers(filter: DeepReadonly<UserFilter>) {
  return useQuery({
    queryKey: [userQueryKey, filter],
    queryFn: async () =>
      (
        await axios.post<{ users: Array<AppUser> }>(
          `${API_ENDPOINT}/filteredUsers`,
          filter,
        )
      ).data.users,
  });
}
