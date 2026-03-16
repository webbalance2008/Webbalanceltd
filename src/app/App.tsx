import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "motion/react";
import { useState, useEffect } from "react";
import { router } from "./routes";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 768
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    setIsDesktop(mq.matches);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

// App entry point
export default function App() {
  const isDesktop = useIsDesktop();
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion={isDesktop ? "never" : "always"}>
        <RouterProvider router={router} />
      </MotionConfig>
    </HelmetProvider>
  );
}