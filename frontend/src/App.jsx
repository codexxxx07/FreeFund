import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import SmoothScroll from "./components/common/SmoothScroll";
import { getSmoothScroll } from "./utils/smoothScroll";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Route change: jump straight to the top of the new page. Reuse the live
    // Lenis instance when smooth scrolling is active so the scroll position
    // state stays in sync; fall back to the native call otherwise (for example
    // when the visitor prefers reduced motion).
    const lenis = getSmoothScroll();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <SmoothScroll />
      <ScrollToTop />
      <AppRoutes />
    </>
  );
}
