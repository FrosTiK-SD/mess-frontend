import { Hostel } from "@/types/hostel";

export let hostelsSample: Array<Hostel> = [
  {
    _id: "1",
    name: "Hostel 1",
  },
  {
    _id: "2",
    name: "Hostel 2",
  },
];

export function deleteSampleHostel(hostelId: string) {
  hostelsSample = hostelsSample.filter((hostel) => hostel._id != hostelId);
}

export function modifySampleHostel(hostelId: string, updatedHostel: Hostel) {
  hostelsSample[hostelsSample.findIndex((hostel) => (hostel._id = hostelId))] =
    updatedHostel;
}
