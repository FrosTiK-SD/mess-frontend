import { Hostel } from "@/types/hostel";

export let hostelsSample: Array<Hostel> = [
  {
    _id: "1",
    caretakers: [],
    name: "Hostel 1",
    inmates: [],
  },
  {
    _id: "2",
    caretakers: [],
    name: "Hostel 2",
    inmates: [],
  },
];

export function deleteSampleHostel(hostelId: string) {
  hostelsSample = hostelsSample.filter((hostel) => hostel._id != hostelId);
}

export function modifySampleHostel(hostelId: string, updatedHostel: Hostel) {
  hostelsSample[hostelsSample.findIndex((hostel) => (hostel._id = hostelId))] =
    updatedHostel;
}
