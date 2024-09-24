import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function usePolling(ms: number, Function: () => void) {
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      Function();
    }, ms);

    return () => clearInterval(intervalId);
  }, []);
}
