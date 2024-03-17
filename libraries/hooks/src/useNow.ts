import { useState } from "react";
import { useInterval } from "usehooks-ts";

export function useNow(interval: number = 10_000) {
  const [now, setNow] = useState(getCurrentDate);
  useInterval(() => setNow(getCurrentDate), interval);
  return now;
}

function getCurrentDate() {
  return new Date();
}
