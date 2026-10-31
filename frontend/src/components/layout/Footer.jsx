import { Link } from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";
import { BRAND_NAME, IS_DEMO } from "../../data/constants";
import { footerGroups } from "../../data/navigation";
import Asterisk from "../editorial/Asterisk";
import PeopleRow from "../editorial/PeopleRow";
import WhatsAppCta from "../common/WhatsAppCta";

export default function Footer() {
  return (
    <footer className="ed-footer">
      <div className="ed-shell">
        <div className="ed-footer__top">
          <div className="ed-footer__brand">
            <p className="ed-label ed-label--lime">
              <Asterisk size={13} />
              Recruitment consultancy · India
            </p>
            <p className="ed-footer__word ed-display" style={{ marginTop: "1rem" }}>
              Jobs <em>Mania</em>
            </p>
            <p style={{ marginTop: "1.25rem", maxWidth: "38ch", lineHeight: 1.65, fontSize: "0.92rem" }}>
              Candidate-first recruitment, free preparation tools and honest guidance. No candidate fees,
              no invented job listings, no data leaving your browser.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem" }}>
              <Link className="ed-btn ed-btn--lime" to="/contact">
                Start a conversation
                <HiArrowUpRight aria-hidden="true" size={14} />
              </Link>
              <WhatsAppCta className="ed-btn">WhatsApp Channel</WhatsAppCta>
            </div>
          </div>

          <div className="ed-footer__cols">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="ed-footer__colhead">{group.title}</p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.whatsapp ? (
                        <WhatsAppCta variant="link" showIcon={false} className="ed-footer__link">
                          {link.label}
                        </WhatsAppCta>
                      ) : (
                        <Link className="ed-footer__link" to={link.to}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <PeopleRow />

        <div className="ed-footer__bar">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}
          </p>
          <p>{IS_DEMO ? "Sample content is labelled · " : ""}Career tools run in your browser</p>
          <p>Designed for candidates, not for algorithms.</p>
        </div>
      </div>
    </footer>
  );
}
