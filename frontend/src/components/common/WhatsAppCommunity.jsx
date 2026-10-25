import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiArrowRight, HiArrowTopRightOnSquare } from "react-icons/hi2";
import siteConfig, { hasWhatsAppCommunity } from "../../data/siteConfig";

/**
 * WhatsApp Community section for the Home page.
 *
 * When siteConfig.whatsappCommunityUrl is configured it renders a real external
 * link (new tab, safe rel, accessible label). Until then the Join Community
 * button stays clickable but explains that the invitation link is coming soon,
 * instead of navigating to an invalid URL.
 *
 * Adding the real link means editing siteConfig.js once — no other file changes.
 */
export default function WhatsAppCommunity() {
  const configured = hasWhatsAppCommunity();
  const [showPending, setShowPending] = useState(false);

  return (
    <section id="whatsapp-community" className="section py-12 sm:py-14" aria-labelledby="whatsapp-community-title">
      <div className="page-shell">
        <div className="surface-card relative overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_auto] lg:items-center">
            <div>
              <p className="eyebrow">Community</p>
              <h2 id="whatsapp-community-title" className="mt-3 text-balance text-3xl sm:text-4xl">
                Join Our WhatsApp Community
              </h2>
              <p className="mt-3 max-w-2xl text-lg leading-[1.7] text-muted">
                Career updates, useful resources and relevant opportunities, shared in one place — so the right roles
                and preparation tips reach you without having to search for them.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                {configured ? (
                  <a
                    className="btn-primary btn-lg"
                    href={siteConfig.whatsappCommunityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Join our WhatsApp community (opens in a new tab)"
                  >
                    <FaWhatsapp aria-hidden="true" />
                    Join Community
                    <HiArrowTopRightOnSquare aria-hidden="true" />
                  </a>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn-primary btn-lg"
                      onClick={() => setShowPending(true)}
                      aria-describedby="whatsapp-community-pending"
                    >
                      <FaWhatsapp aria-hidden="true" />
                      Join Community
                      <HiArrowRight aria-hidden="true" />
                    </button>
                    <span className="badge">Link coming soon</span>
                  </>
                )}
                <p className="text-sm text-muted">Career updates only — no spam.</p>
              </div>

              {!configured && showPending ? (
                <p id="whatsapp-community-pending" role="status" className="mt-4 text-sm text-muted">
                  The community invitation link is not available yet. It will be added to this page as soon as it is
                  shared with us — please check back shortly.
                </p>
              ) : null}
            </div>

            <div className="hidden lg:flex lg:justify-end">
              <span className="grid h-24 w-24 place-items-center rounded-3xl border border-line bg-secondary text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_18px_36px_-18px_rgba(17,17,17,0.35)]">
                <FaWhatsapp size={32} aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
