import { useEffect, useState } from "react";

export function usePolling(
  ms: number,
  asyncPollingFunction: () => Promise<boolean>
) {
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    console.log("Polling started..."); // Added log for when polling starts

    const intervalId = setInterval(async () => {
      console.log("Polling check at interval..."); // Log at each interval
      try {
        const transactionFound = await asyncPollingFunction();
        console.log("Transaction found status:", transactionFound); // Log result of polling check
        if (transactionFound) {
          setSuccess(true);
          clearInterval(intervalId); // Stop polling if found
        }
      } catch (error) {
        console.error("Error during polling:", error);
      }
    }, ms);

    const timeoutId = setTimeout(() => {
      console.log("Polling stopped after 2 minutes");
      clearInterval(intervalId);
    }, 120000); // Poll for 2 minutes

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [ms, asyncPollingFunction]);

  return success;
}
