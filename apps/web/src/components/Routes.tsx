import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../examples/dashboard/Dashboard";
import { Sandbox } from "../examples/sandbox/Sandbox";
import { Layout } from "./Layout";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Sandbox />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
