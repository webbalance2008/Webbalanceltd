import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import "../../styles/fonts.css";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Preloader } from "./Preloader";
import { PreloaderContext } from "../contexts/PreloaderContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Root() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <PreloaderContext.Provider value={preloaderDone}>
      <div className="bg-[#16212e] min-h-screen">
        {!preloaderDone && (
          <Preloader onComplete={() => setPreloaderDone(true)} />
        )}
        <ScrollToTop />
        <Nav />
        <Outlet />
        <Footer />
      </div>
    </PreloaderContext.Provider>
  );
}