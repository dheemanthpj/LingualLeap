import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="120"
      height="30"
      {...props}
    >
      <text
        x="10"
        y="35"
        fontFamily="'PT Sans', sans-serif"
        fontSize="30"
        fontWeight="bold"
        className="fill-primary"
      >
        Lingua
      </text>
      <text
        x="105"
        y="35"
        fontFamily="'PT Sans', sans-serif"
        fontSize="30"
        fontWeight="bold"
        className="fill-accent"
      >
        Leap
      </text>
    </svg>
  );
}
