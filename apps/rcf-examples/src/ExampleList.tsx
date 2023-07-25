import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import type { ComponentType, ReactNode } from "react";
import { useState } from "react";
import { LoginExample } from "./examples/LoginExample";

export function ExampleList() {
  const [tabIndex, setTabIndex] = useState(0);
  const CurrentTab = tabs[tabIndex].component;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={(e, newTab) => setTabIndex(newTab)}>
          {tabs.map(({ tab }, index) => (
            <Tab key={index} label={tab} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        <CurrentTab />
      </Box>
    </Box>
  );
}

const tabs: Array<{ tab: ReactNode; component: ComponentType }> = [
  { tab: "Login", component: LoginExample },
];
