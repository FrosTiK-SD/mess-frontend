import { CreateHostelRoomsForm } from "@/components/Hostel/HostelPopulated";
import { hostelsQueryKey, roomsQueryKey } from "@/constants/tanstackQuery";
import { API_ENDPOINT } from "@/constants/utils";
import { RoomWithAllotments } from "@/types/room";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useGetHostelRooms(
  hostelId: string,
  semester: string,
  enabled: boolean,
) {
  return useQuery({
    queryKey: [hostelsQueryKey, hostelId, roomsQueryKey],
    enabled,
    queryFn: async () => {
      return (
        await axios.get<{ rooms: Array<RoomWithAllotments> }>(
          `${API_ENDPOINT}/semesters/${semester}/hostels/${hostelId}/rooms`,
        )
      ).data.rooms;
    },
  });
}

export function useBatchCreateHostelRoomsMutation(hostelId: string) {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, CreateHostelRoomsForm>({
    mutationFn: (ReqForm) => {
      return axios.post(
        `${API_ENDPOINT}/hostels/${hostelId}/batch/rooms`,
        ReqForm,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [hostelsQueryKey, hostelId, roomsQueryKey],
        exact: true,
      });
    },
  });
}
