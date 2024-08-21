export interface Room {
  _id: string;
  hostel: string;
  number: number;
  floor: number;
  available: boolean;
  remarks: string;
  occupancy: number;
}

export interface RoomWithAllotments extends Room {
  allotments: number;
}
