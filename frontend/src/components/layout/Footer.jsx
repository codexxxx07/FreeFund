import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { HiArrowRight, HiEnvelope, HiMapPin, HiPhone } from "react-icons/hi2";
import { BRAND_NAME, CONTACT_PLACEHOLDERS, IS_DEMO, isPlaceholder } from "../../data/constants";
import { footerGroups } from "../../data/navigation";
import aboutConfig from "../../data/aboutConfig";
import WhatsAppCta from "../common/WhatsAppCta";

export default function Footer() {
  const showEmail = !isPlaceholder(CONTACT_PLACEHOLDERS.email);
  const showPhone = !isPlaceholder(CONTACT_PLACEHOLDERS.phone);
  const showRegion = !isPlaceholder(CONTACT_PLACEHOLDERS.region);
  const showContact = showEmail || showPhone || showRegion;
  const showSocial = Boolean(aboutConfig.linkedInUrl);

  return (
    <footer className="border-t border-line bg-secondary">
      <div className="page-shell py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.5fr_1fr_1.1fr_1fr_1fr]">
          <div className="xl:pr-6">
            <div className="flex items-center gap-3">
              <span className="brand-mark" aria-hidden="true">
                <span className="relative z-10">JM</span>
              </span>
              <div>
                <p className="font-display text-lg font-bold">{BRAND_NAME}</p>
                <p className="text-sm text-muted">Recruitment Consultancy</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Explore current openings, build an ATS-friendly resume, and use free career resources prepared for
              candidates.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/jobs" className="btn-primary">
                Find Jobs
                <HiArrowRight aria-hidden="true" />
              </Link>
            </div>

            {showContact ? (
              <ul className="mt-6 space-y-2.5 text-sm text-muted">
                {showEmail ? (
                  <li className="flex items-start gap-2.5">
                    <HiEnvelope className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                    <span className="break-words">{CONTACT_PLACEHOLDERS.email}</span>
                  </li>
                ) : null}
                {showPhone ? (
                  <li className="flex items-start gap-2.5">
                    <HiPhone className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                    <span>{CONTACT_PLACEHOLDERS.phone}</span>
                  </li>
                ) : null}
                {showRegion ? (
                  <li className="flex items-start gap-2.5">
                    <HiMapPin className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                    <span>{CONTACT_PLACEHOLDERS.region}</span>
                  </li>
                ) : null}
              </ul>
            ) : null}

            {showSocial ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                <li>
                  <a
                    href={aboutConfig.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary min-h-0 px-3 py-2"
                    aria-label="Jobs Mania - Freefund on LinkedIn (opens in a new tab)"
                  >
                    <FaLinkedin aria-hidden="true" />
                    LinkedIn
                  </a>
                </li>
              </ul>
            ) : null}
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="font-display text-sm font-bold">{group.title}</p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.whatsapp ? (
                      <WhatsAppCta variant="link" showIcon={false}>
                        {link.label}
                      </WhatsAppCta>
                    ) : (
                      <Link className="footer-link" to={link.to}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <div className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
              {IS_DEMO ? <p>Sample listings only</p> : null}
              <p>Career tools run entirely in your browser.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
