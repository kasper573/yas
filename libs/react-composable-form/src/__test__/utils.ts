export function silenceErrorLogs() {
  const original = console.error;
  console.error = () => {};
  return () => {
    console.error = original;
  };
}
