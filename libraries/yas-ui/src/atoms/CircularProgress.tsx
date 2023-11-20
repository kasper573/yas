import { styled } from "@yas/style";
import {
  circle,
  circularProgressRecipe,
  viewBoxSize,
} from "./CircularProgress.css";

export const CircularProgress = styled(Svg, circularProgressRecipe).attrs({
  role: "progressbar",
});

function Svg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <circle className={circle} />
    </svg>
  );
}
