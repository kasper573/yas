import { styled } from "@yas/style";
import { Paper } from "@yas/ui";
import { card } from "./Card.css";

export const Card = styled(Paper).attrs({ elevation: "0", className: card });
