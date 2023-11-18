import { styled } from "@yas/style";
import { alertRecipe } from "./Alert.css";

export const Alert = styled("div", alertRecipe).attrs({ role: "alert" });
