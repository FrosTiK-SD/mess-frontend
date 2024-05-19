import {
  Typography as MTText,
  TypographyProps,
  Spinner as MTSpinner,
  SpinnerProps,
} from "@material-tailwind/react";

export function Typography(props: TypographyProps) {
  // @ts-ignore
  return <MTText {...props}></MTText>;
}

export function Spinner(props: SpinnerProps) {
  // @ts-ignore
  return <MTSpinner {...props}></MTSpinner>;
}
