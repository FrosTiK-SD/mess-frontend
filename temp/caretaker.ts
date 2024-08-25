import { UserMini } from "@/types/user";

// export const caretaker1: UserMini = {
//   _id: "caretaker_1",
//   email: "caretaker_1@gmail.com",
//   firstName: "caretaker",
//   middleName: "",
//   lastName: "one",
//   mobile: "1234567890",
// };
export function getSampleCaretaker(seed: number): UserMini {
  return {
    _id: `caretaker_${seed}`,
    email: `caretaker_${seed}@gmail.com`,
    firstName: "caretaker",
    middleName: "",
    lastName: `${seed}`,
    mobile: `+91 ${seed}`,
  };
}
