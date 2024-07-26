import { LoadingOverlay } from "@mantine/core";

export function LoadingComponent({ visible }: { visible: boolean }) {
  return (
    <LoadingOverlay
      visible={visible}
      zIndex={1000}
      overlayProps={{ radius: "xl" }}
      loaderProps={{ color: "grape", type: "bars" }}
    />
  );
}
