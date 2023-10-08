import { atoms, unsafe } from "@yas/css";

unsafe.globalStyle("html, body, #root", {
  minHeight: "100vh",
  margin: 0,
});

export const app = unsafe.style([
  atoms({ background: "background" }),
  { minHeight: "100vh" },
]);
