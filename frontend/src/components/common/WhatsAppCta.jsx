import { FaWhatsapp } from "react-icons/fa";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import siteConfig, { hasWhatsAppChannel } from "../../data/siteConfig";

/**
 * WhatsApp Channel call-to-action used in the Navbar, Home page and Footer.
 *
 * When siteConfig.whatsappChannelUrl is configured it renders a real external
 * link (new tab, safe rel, accessible label). When it is not, it renders a
 * clearly disabled control labelled as unconfigured instead of a broken link.
 *
 * variant: "button" (default) renders a button-styled control,
 *          "link" renders a footer-style text link.
 */
export default function WhatsAppCta({
  children = "Join our WhatsApp Channel",
  variant = "button",
  className = "",
  showIcon = true,
}) {
  const configured = hasWhatsAppChannel();
  const label = children;

  if (variant === "link") {
    if (!configured) {
      return (
        <span className="footer-link footer-link-placeholder" title="WhatsApp Channel link to be confirmed by the owner">
          {showIcon ? <FaWhatsapp aria-hidden="true" className="mr-2" /> : null}
          {label}
          <span className="sr-only"> (link to be confirmed)</span>
        </span>
      );
    }
    return (
      <a
        className={`footer-link ${className}`}
        href={siteConfig.whatsappChannelUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} (opens in a new tab)`}
      >
        {showIcon ? <FaWhatsapp aria-hidden="true" className="mr-2" /> : null}
        {label}
        <HiArrowTopRightOnSquare aria-hidden="true" className="ml-1.5 opacity-60" />
      </a>
    );
  }

  if (!configured) {
    return (
      <button type="button" className={`btn-primary ${className}`} disabled>
        {showIcon ? <FaWhatsapp aria-hidden="true" /> : null}
        {label}
      </button>
    );
  }

  return (
    <a
      className={`btn-primary ${className}`}
      href={siteConfig.whatsappChannelUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
    >
      {showIcon ? <FaWhatsapp aria-hidden="true" /> : null}
      {label}
      <HiArrowTopRightOnSquare aria-hidden="true" />
    </a>
  );
}
