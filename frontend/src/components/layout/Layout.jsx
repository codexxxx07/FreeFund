import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();
  const hasMobileApplyBar = /^\/jobs\/[^/]+$/.test(pathname);

  return (
    <div className={`flex min-h-screen flex-col bg-bg ${hasMobileApplyBar ? "pb-24 lg:pb-0" : ""}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

