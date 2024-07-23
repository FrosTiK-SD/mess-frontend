import { NavbarElementSchema } from "@/types/navbar";
import {
  IconBowl,
  IconBuildingSkyscraper,
  IconSchool,
} from "@tabler/icons-react";

export const navbarSchema: Array<NavbarElementSchema> = [
  {
    icon: IconSchool,
    label: "Students",
    path: "/student/mess",
  },
  {
    icon: IconBuildingSkyscraper,
    label: "Admin",
    path: "/admin/students",
  },
  {
    icon: IconBowl,
    label: "Mess",
    path: "/mess",
  },
];
