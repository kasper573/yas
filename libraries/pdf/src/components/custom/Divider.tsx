import { styled } from "../../utils/createComponent";
import { View } from "../react-pdf";

export const Divider = styled(View, {
  sx: {
    marginVertical: "l",
    borderBottom: "thin",
    borderStyle: "solid",
    borderColor: "tint",
    width: "100%",
  },
});
