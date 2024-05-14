import { NavbarElementSchema } from "@/components/Layout/Navbar";
import { IconBuildingSkyscraper, IconSchool } from "@tabler/icons-react";

export const navbarSchema: Array<NavbarElementSchema> = [
  {
    icon: IconSchool,
    label: "Students",
    path: "/admin/students",
  },
  {
    icon: IconBuildingSkyscraper,
    label: "Hostels",
    path: "/admin/hostels",
  },
];
