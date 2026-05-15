import type { ReactElement, SVGProps } from "react";

export type IconType = "CHECK_COMPLETE" | "CLOSE_M";

interface IconProps extends SVGProps<SVGSVGElement> {
  type: IconType;
}

const icons: Record<IconType, (props: SVGProps<SVGSVGElement>) => ReactElement> = {
  CHECK_COMPLETE: (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M7 12.25L10.25 15.5L17 8.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  CLOSE_M: (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M6.75 6.75L17.25 17.25M17.25 6.75L6.75 17.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export default function Icon({ type, ...props }: IconProps) {
  const SelectedIcon = icons[type];

  return <SelectedIcon {...props} />;
}
