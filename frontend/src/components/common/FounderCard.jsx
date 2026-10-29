import { FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import aboutConfig from "../../data/aboutConfig";

/**
 * FounderCard
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium black-and-white profile card for the About page: circular photo,
 * name, designation, one-line description and the LinkedIn / WhatsApp /
 * Instagram row.
 *
 * Social URLs live in src/data/aboutConfig.js → founder.social — the same
 * values the About page contact section uses, so they are edited in one place.
 * An entry left empty renders as a clearly disabled control (no href, no
 * invented link) with an accessible label, so the icon can be wired up later
 * without touching JSX.
 *
 * The card itself reveals through `data-reveal="scale"` on its wrapper; the
 * social icons stagger in just after it via `utils/scrollReveal.js`.
 */

const founder = aboutConfig.founder;

const socials = [
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: <FaLinkedinIn aria-hidden="true" />,
    url: founder.social.linkedin,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: <FaWhatsapp aria-hidden="true" />,
    url: founder.social.whatsapp,
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: <FaInstagram aria-hidden="true" />,
    url: founder.social.instagram,
  },
];

function SocialButton({ label, icon, url }) {
  const pendingLabel = `${label} link coming soon`;

  if (!url) {
    return (
      <span
        className="founder-social founder-social-pending"
        aria-label={pendingLabel}
        aria-disabled="true"
        role="img"
        title={pendingLabel}
      >
        {icon}
      </span>
    );
  }

  return (
    <a
      className="founder-social"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      title={label}
    >
      {icon}
    </a>
  );
}

export default function FounderCard() {
  if (!founder) return null;

  return (
    <article className="founder-card surface-card mx-auto w-full max-w-md p-7 text-center sm:p-9">
      {/* Decorative crop mark — echoes the site's editorial styling. */}
      <svg
        className="founder-card-mark"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M2.5 7.5v-5h5M16.5 2.5h5v5M21.5 16.5v5h-5M7.5 21.5h-5v-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>

      <div className="founder-avatar-wrap">
        <span className="founder-avatar-halo" aria-hidden="true" />
        <div className="founder-avatar">
          <span className="founder-avatar-fallback" aria-hidden="true">
            PS
          </span>
          <img
            src={founder.image}
            alt={founder.imageAlt}
            width={160}
            height={160}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.visibility = "hidden";
            }}
          />
        </div>
      </div>

      <h3 className="founder-name mt-6">{founder.name}</h3>
      <p className="founder-designation mt-1.5">{founder.designation}</p>
      <p className="founder-tagline mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted">
        {founder.tagline}
      </p>

      <ul className="founder-socials mt-6" aria-label={`${founder.name} on social media`}>
        {socials.map(({ key, label, icon, url }, index) => (
          <li
            key={key}
            data-reveal
            style={{ "--reveal-delay": `${160 + index * 70}ms` }}
          >
            <SocialButton label={label} icon={icon} url={url} />
          </li>
        ))}
      </ul>
    </article>
  );
}
