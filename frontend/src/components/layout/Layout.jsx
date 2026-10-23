import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { IS_DEMO } from "../../data/constants";

export default function Layout() {
  const { pathname } = useLocation();
  const hasMobileApplyBar = /^\/jobs\/[^/]+$/.test(pathname);

  return (
    <div className={`flex min-h-screen flex-col bg-bg ${hasMobileApplyBar ? "pb-24 lg:pb-0" : ""}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {IS_DEMO ? (
        <div className="border-b border-line bg-secondary">
          <div className="page-shell py-1.5 text-center text-xs text-muted">
            Sample listings. Applications are not sent to employers.
          </div>
        </div>
      ) : null}
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

