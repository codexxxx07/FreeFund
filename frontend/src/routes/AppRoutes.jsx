import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import ResumeBuilder from "../pages/ResumeBuilder";
import PracticeTools from "../pages/PracticeTools";
import CareerGuidance from "../pages/CareerGuidance";
import CareerArticle from "../pages/CareerArticle";
import FreeTraining from "../pages/FreeTraining";
import About from "../pages/About";
import Contact from "../pages/Contact";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Terms from "../pages/Terms";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        {/* Career resources */}
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/practice-tools" element={<PracticeTools />} />
        <Route path="/career-guidance" element={<CareerGuidance />} />
        <Route path="/career-guidance/:slug" element={<CareerArticle />} />
        <Route path="/free-training" element={<FreeTraining />} />

        {/* Company */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Legal — canonical paths first, legacy paths kept as aliases */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="/terms" element={<Terms />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
