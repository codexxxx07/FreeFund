import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import initScrollReveal from "../../utils/scrollReveal";

export default function Layout() {
  // One shared IntersectionObserver for every [data-reveal] section on the
  // site. It scans on mount and then watches for nodes added later, so route
  // changes reveal their content too; the cleanup disconnects both observers.
  useEffect(() => initScrollReveal(), []);

  return (
    <div className="site-frame">
      <div className="site-canvas flex flex-col">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
