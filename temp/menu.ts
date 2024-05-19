import { Day, MealPopulated } from "@/types/meal";

export const dummyMealPopulated: MealPopulated[] = [
  {
    _id: "134",
    attendedStudents: [
      {
        _id: "32r23",
        hostelName: "Rajputana",
        name: "DevRAJ",
        room: "Not145",
      },
    ],
    removedStudents: [
      {
        _id: "32r23",
        hostelName: "Saraaiyyaa",
        name: "Soummikk",
        room: "IDK",
      },
    ],
    date: new Date().getTime(),
    day: Day.FRIDAY,
    menu: [
      {
        _id: "134",
        cost: 32.4,
        label: `Chole Batore ${Math.random()}`,
        mess: "415342",
      },
    ],
    mess: "34215",
    type: {
      _id: "412512",
      cost: 50,
      startTime: "8 AM",
      endTime: "10 AM",
      mess: "214512",
      name: "Lunch",
    },
  },
];
