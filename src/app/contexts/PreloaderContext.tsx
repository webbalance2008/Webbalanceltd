import { createContext, useContext } from "react";

export const PreloaderContext = createContext<boolean>(false);

export function usePreloaderDone() {
  return useContext(PreloaderContext);
}
