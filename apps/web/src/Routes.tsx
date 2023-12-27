import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
const Layout = lazy(() => import("./components/Layout"));

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          Component={lazy(() => import("./examples/sandbox/Sandbox"))}
        />
        <Route
          path="/dashboard"
          Component={lazy(() => import("./examples/dashboard/Dashboard"))}
        />
      </Route>
    </Routes>
  );
}
