import { atoms, unsafe } from "@yas/css";

unsafe.globalStyle("html, body, #root", {
  minHeight: "100vh",
  margin: 0,
});

export const app = atoms({
  background: "surfaceMain",
  minHeight: "100vh",
});
