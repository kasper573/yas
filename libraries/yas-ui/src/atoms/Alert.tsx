import { styled } from "@yas/style";
import { alertRecipe } from "./Alert.css";
import { Text } from "./Text";

export const Alert = styled(Text, alertRecipe).attrs({ role: "alert" });
