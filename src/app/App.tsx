import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "motion/react";
import { router } from "./routes";

// App entry point
export default function App() {
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="never">
        <RouterProvider router={router} />
      </MotionConfig>
    </HelmetProvider>
  );
}