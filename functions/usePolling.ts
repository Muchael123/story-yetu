import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function usePolling(
  ms: number,
  asyncPollingFunction: () => Promise<boolean>
) {
  const [success, setSuccess] = useState(false); // State to track if the transaction is found
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        // Call the async function to check the transaction
        const transactionFound = await asyncPollingFunction();

        // If transaction is found, stop the polling
        if (transactionFound) {
          setSuccess(true);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error checking transaction:", error);
      }
    }, ms);

    // Stop polling after 1.5 minutes (90000ms)
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 90000);

    // Clean up the interval and timeout on component unmount
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [ms, asyncPollingFunction]);

  return success; // Return the success state
}
