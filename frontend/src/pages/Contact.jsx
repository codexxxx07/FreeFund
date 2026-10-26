import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  HiCheckCircle,
  HiChatBubbleLeftRight,
  HiClipboardDocument,
  HiEnvelope,
  HiMapPin,
  HiPhone,
  HiArrowLeft,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import SelectDropdown from "../components/common/SelectDropdown";
import { BRAND_NAME, CONTACT_PLACEHOLDERS, isPlaceholder } from "../data/constants";
import { hasWhatsAppEnquiry, whatsappEnquiryLink } from "../data/siteConfig";
import { isEmptyErrors, validateContact } from "../utils/validation";

const CONTACT_TOPICS = [
  { value: "candidate", label: "Candidate enquiry" },
  { value: "employer", label: "Employer / vacancy listing" },
  { value: "training", label: "Free training enquiry" },
  { value: "report", label: "Report a suspicious listing" },
  { value: "other", label: "Other" },
];

const TOPIC_LABELS = Object.fromEntries(CONTACT_TOPICS.map((topic) => [topic.value, topic.label]));

export default function Contact() {
  const [searchParams] = useSearchParams();
  const topicFromUrl = searchParams.get("topic");
  const subjectFromUrl = searchParams.get("subject") || "";
  const initialTopic = CONTACT_TOPICS.some((topic) => topic.value === topicFromUrl) ? topicFromUrl : "";

  const [values, setValues] = useState({
    name: "",
    email: "",
    topic: initialTopic,
    subject: subjectFromUrl,
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [composed, setComposed] = useState(null);
  const [copied, setCopied] = useState(false);

  const showEmail = !isPlaceholder(CONTACT_PLACEHOLDERS.email);
  const showPhone = !isPlaceholder(CONTACT_PLACEHOLDERS.phone);
  const showRegion = !isPlaceholder(CONTACT_PLACEHOLDERS.region);
  const contactRows = [
    showEmail ? { icon: HiEnvelope, label: "Email", value: CONTACT_PLACEHOLDERS.email } : null,
    showPhone ? { icon: HiPhone, label: "Phone", value: CONTACT_PLACEHOLDERS.phone } : null,
    showRegion ? { icon: HiMapPin, label: "Region", value: CONTACT_PLACEHOLDERS.region } : null,
  ].filter(Boolean);

  const canEmail = showEmail;
  const canWhatsApp = hasWhatsAppEnquiry();

  function update(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function buildBody() {
    const topicLabel = values.topic ? TOPIC_LABELS[values.topic] || values.topic : "General enquiry";
    return [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Enquiry type: ${topicLabel}`,
      "",
      values.message,
    ].join("\n");
  }

  function onSubmit(event) {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (!isEmptyErrors(nextErrors)) return;
    setComposed({ subject: values.subject, body: buildBody() });
    setCopied(false);
  }

  async function copyMessage() {
    if (!composed) return;
    try {
      await navigator.clipboard.writeText(composed.body);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  const mailtoHref = composed
    ? `mailto:${CONTACT_PLACEHOLDERS.email}?subject=${encodeURIComponent(composed.subject)}&body=${encodeURIComponent(composed.body)}`
    : "";
  const whatsappHref = composed ? whatsappEnquiryLink(composed.body) : "";

  return (
    <div>
      <PageMeta
        title="Contact Us"
        description={`Contact ${BRAND_NAME} about a vacancy, an employer listing, a training programme or a suspicious job offer.`}
      />

      <section className="border-b border-line bg-secondary">
        <div className="page-shell py-12 sm:py-14">
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Get in touch"
            description="Candidate question, employer listing, training enquiry, or a suspicious offer you want us to check — write it once and send it through the channel you prefer."
          />
        </div>
      </section>

      <div className="page-shell py-12 sm:py-14">
        <div className="grid items-start gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {composed ? (
            <div className="surface-panel p-6 sm:p-8">
              <span className="icon-tile icon-tile-solid icon-tile-lg">
                <HiCheckCircle aria-hidden="true" size={26} />
              </span>
              <h2 className="mt-5 text-xl sm:text-2xl">Your message is ready to send</h2>
              <p className="mt-2 max-w-xl text-muted">
                This website does not store or deliver messages. Nothing has been sent yet — choose how you want to
                send it, and it goes directly from you.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {canEmail ? (
                  <a className="btn-primary btn-lg" href={mailtoHref}>
                    <HiEnvelope aria-hidden="true" />
                    Open in email app
                  </a>
                ) : (
                  <button type="button" className="btn-primary btn-lg" disabled>
                    <HiEnvelope aria-hidden="true" />
                    Email address to be confirmed
                  </button>
                )}

                {canWhatsApp ? (
                  <a
                    className="btn-secondary btn-lg"
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Send this message on WhatsApp (opens in a new tab)"
                  >
                    <FaWhatsapp aria-hidden="true" />
                    Send on WhatsApp
                  </a>
                ) : (
                  <button type="button" className="btn-secondary btn-lg" disabled>
                    <FaWhatsapp aria-hidden="true" />
                    WhatsApp number to be confirmed
                  </button>
                )}
              </div>

              {!canEmail && !canWhatsApp ? (
                <div className="demo-notice mt-5" role="note">
                  <p>
                    No delivery channel is configured yet. Copy your message below and send it once the official
                    contact details are published, or use the contact details shown on the right.
                  </p>
                </div>
              ) : null}

              <div className="surface-inset mt-6 p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Subject</p>
                <p className="mt-1 text-sm font-semibold text-fg">{composed.subject}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted">Message</p>
                <pre className="mt-1.5 max-h-64 overflow-auto whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-muted">
                  {composed.body}
                </pre>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-6">
                <button type="button" className="btn-secondary" onClick={() => setComposed(null)}>
                  <HiArrowLeft aria-hidden="true" />
                  Edit message
                </button>
                <button type="button" className="btn-secondary" onClick={copyMessage}>
                  <HiClipboardDocument aria-hidden="true" />
                  {copied ? "Copied" : "Copy message"}
                </button>
              </div>
            </div>
          ) : (
            <form className="surface-panel p-6 sm:p-8" onSubmit={onSubmit} noValidate>
              <div className="flex items-start gap-3 border-b border-line pb-6">
                <span className="icon-tile icon-tile-solid">
                  <HiChatBubbleLeftRight aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl">Write your message</h2>
                  <p className="mt-1 text-sm text-muted">
                    You review and send it yourself on the next step. Nothing is stored on this site.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <SelectDropdown
                    label="Enquiry type"
                    value={values.topic}
                    onChange={(value) => setValues((current) => ({ ...current, topic: value }))}
                    options={CONTACT_TOPICS}
                    placeholder="Select an enquiry type"
                  />
                </div>
                <label>
                  <span className="field-label">Name (required)</span>
                  <input
                    className="field-input"
                    name="name"
                    value={values.name}
                    onChange={update}
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                  />
                  {errors.name ? (
                    <p id="contact-name-error" className="field-error">
                      {errors.name}
                    </p>
                  ) : null}
                </label>
                <label>
                  <span className="field-label">Your email (required)</span>
                  <input
                    className="field-input"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={update}
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                  />
                  {errors.email ? (
                    <p id="contact-email-error" className="field-error">
                      {errors.email}
                    </p>
                  ) : null}
                </label>
                <label className="sm:col-span-2">
                  <span className="field-label">Subject (required)</span>
                  <input
                    className="field-input"
                    name="subject"
                    value={values.subject}
                    onChange={update}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                  />
                  {errors.subject ? (
                    <p id="contact-subject-error" className="field-error">
                      {errors.subject}
                    </p>
                  ) : null}
                </label>
                <label className="sm:col-span-2">
                  <span className="field-label">Message (required)</span>
                  <textarea
                    className="field-textarea"
                    name="message"
                    value={values.message}
                    onChange={update}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                  />
                  {errors.message ? (
                    <p id="contact-message-error" className="field-error">
                      {errors.message}
                    </p>
                  ) : null}
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted sm:max-w-xs">
                  Your details stay in this browser until you choose to send them.
                </p>
                <button type="submit" className="btn-primary sm:w-auto">
                  Review and send
                </button>
              </div>
            </form>
          )}

          <aside className="surface-panel p-6 sm:p-8">
            <p className="eyebrow">Contact</p>
            <h2 className="mt-3 text-xl">Details</h2>
            {contactRows.length ? (
              <ul className="mt-5 grid gap-3">
                {contactRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <li key={row.label} className="surface-soft flex items-start gap-3 p-4">
                      <span className="icon-tile">
                        <Icon aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{row.label}</p>
                        <p className="mt-1 break-words text-sm">{row.value}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted">Verified contact details will appear here once confirmed.</p>
            )}

            <div className="mt-6 border-t border-line pt-6">
              <p className="text-sm font-semibold">Quick links</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <Link to="/career-guidance" className="btn-secondary min-h-0 px-3 py-2">
                  Career Guidance
                </Link>
                <Link to="/free-training" className="btn-secondary min-h-0 px-3 py-2">
                  Free Training
                </Link>
              </div>
            </div>

            <p className="mt-6 border-t border-line pt-5 text-xs text-muted">
              We will never ask you for money, an OTP, or bank details to get a job. If someone does, stop and report
              it here.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
