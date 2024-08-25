import { ASSETS } from "@/constants/assets";
import { Avatar } from "@mantine/core";
import { BarLoader } from "react-spinners";
import { Typography } from "./components";

export function LoadingPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center">
        <Avatar src={ASSETS.iitbhu_logo} size="lg" alt="IIT BHU" />
        <Typography className="p-5" variant="h3">
          Training and Placement Cell
        </Typography>
        <BarLoader color={"#701a75"} />
      </div>
    </div>
  );
}
