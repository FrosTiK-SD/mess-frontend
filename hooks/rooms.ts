import { hostelsQueryKey, roomsQueryKey } from "@/constants/tanstackQuery";
import { API_ENDPOINT } from "@/constants/utils";
import { RoomPopulated } from "@/types/room";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetHostelRooms(hostelId: string) {
  return useQuery({
    queryKey: [hostelsQueryKey, hostelId, roomsQueryKey],
    queryFn: async () => {
      return (
        await axios.get<{ rooms: Array<RoomPopulated> }>(
          `${API_ENDPOINT}/hostels/${hostelId}/rooms`,
        )
      ).data.rooms;
    },
  });
}
