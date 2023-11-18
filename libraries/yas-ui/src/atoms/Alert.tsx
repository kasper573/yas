import { styled } from "@yas/css";
import { alertRecipe } from "./Alert.css";

export const Alert = styled("div", alertRecipe).attrs({ role: "alert" });
