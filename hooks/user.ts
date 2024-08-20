import { API_ENDPOINT } from "@/constants/utils";
import { AppUser } from "@/types/user";
import axios from "axios";

export async function FetchUserByRollNo(rollNo: number) {
  return (
    await axios.get<{ user: AppUser }>(`${API_ENDPOINT}/rollNo/${rollNo}/user`)
  ).data.user;
}
