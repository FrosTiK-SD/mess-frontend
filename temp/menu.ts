import { Day, MealPopulated, MealType, MenuItem } from "@/types/meal";

export const dummyMealPopulated: MealPopulated[] = [
  {
    _id: "134",
    attendedStudents: [
      {
        _id: "32r23",
        allocatedHostel: "Rajputana",
        firstName: "DevRAJ",
        allocatedRoom: "Not145",
      },
    ],
    removedStudents: [
      {
        _id: "32r23",
        allocatedHostel: "Saraaiyyaa",
        firstName: "Soummikk",
        allocatedRoom: "IDK",
      },
    ],
    date: new Date().getTime(),
    day: Day.FRIDAY,
    menu: [
      {
        _id: "134",
        cost: 32.4,
        label: `Chole Batore ${Math.floor(Math.random() * 10)}`,
        description: "Chole and Batore",
        mess: "415342",
      },
    ],
    mess: "34215",
    type: {
      _id: "41253412",
      cost: 25,
      startTime: "8 AM",
      endTime: "10 AM",
      mess: "214512",
      name: "Breakfast",
    },
  },
  {
    _id: "134",
    attendedStudents: [
      {
        _id: "32r23",
        allocatedHostel: "Rajputana",
        firstName: "DevRAJ",
        allocatedRoom: "Not145",
      },
    ],
    removedStudents: [
      {
        _id: "32r23",
        allocatedHostel: "Saraaiyyaa",
        firstName: "Soummikk",
        allocatedRoom: "IDK",
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
      startTime: "12 PM",
      endTime: "2 PM",
      mess: "214512",
      name: "Lunch",
    },
  },
];

export const dummyFoodItems: MenuItem[] = [
  {
    _id: "134",
    cost: 32.4,
    label: `Chole Batore ${Math.random()}`,
    mess: "415342",
  },
  {
    _id: "13rr4",
    cost: 32.4,
    label: `Chole Batore ${Math.random()}`,
    mess: "415342",
  },
  {
    _id: "1evw34",
    cost: 32.4,
    label: `Chole Batore ${Math.random()}`,
    mess: "415342",
  },
  {
    _id: "1334",
    cost: 32.4,
    label: `Chole Batore ${Math.random()}`,
    mess: "415342",
  },
  {
    _id: "134ewv",
    cost: 32.4,
    label: `Chole Batore ${Math.random()}`,
    mess: "415342",
  },
  {
    _id: "1eg34",
    cost: 32.4,
    label: `Chole Batore ${Math.random()}`,
    mess: "415342",
  },
  {
    _id: "134erg",
    cost: 32.4,
    label: `Chole Batore ${Math.random()}`,
    mess: "415342",
  },
];

export const dummyMealTypes: MealType[] = [
  {
    _id: "41253412",
    cost: 25,
    startTime: "08:00",
    endTime: "10:00",
    mess: "214512",
    name: "Breakfast",
  },
  {
    _id: "41253fv412",
    cost: 50,
    startTime: "12:00",
    endTime: "14:00",
    mess: "214512",
    name: "Lunch",
  },
  {
    _id: "412534sv12",
    cost: 50,
    startTime: "20:00",
    endTime: "22:00",
    mess: "214512",
    name: "Dinner",
  },
];
