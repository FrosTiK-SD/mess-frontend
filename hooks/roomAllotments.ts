import {
  roomAllotmentsQueryKey,
  roomsQueryKey,
} from "@/constants/tanstackQuery";
import { API_ENDPOINT } from "@/constants/utils";
import { RoomAllotment, RoomAllotmentWithUser } from "@/types/roomAllotment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useCreateRoomAllotmentMutation() {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, RoomAllotment>({
    mutationFn: (roomAllotment) =>
      axios.post<RoomAllotment>(
        `${API_ENDPOINT}/roomAllotments`,
        roomAllotment,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [roomAllotmentsQueryKey],
      });
    },
  });
}

export function useGetSemesterRoomAllotmentsWithUser(
  semesterId: string,
  roomId: string,
  enabled: boolean,
) {
  return useQuery({
    queryKey: [
      roomsQueryKey,
      semesterId,
      roomsQueryKey,
      roomId,
      roomAllotmentsQueryKey,
    ],
    queryFn: async () =>
      (
        await axios.get<{ roomAllotments: Array<RoomAllotmentWithUser> }>(
          `${API_ENDPOINT}/semesters/${semesterId}/rooms/${roomId}/roomAllotments`,
        )
      ).data.roomAllotments,
    enabled,
  });
}
