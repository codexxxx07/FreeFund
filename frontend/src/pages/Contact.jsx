import { useState } from "react";
import { HiCheckCircle, HiChatBubbleLeftRight, HiEnvelope, HiMapPin, HiPhone } from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import { CONTACT_PLACEHOLDERS } from "../data/constants";
import { isEmptyErrors, validateContact } from "../utils/validation";

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function update(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function onSubmit(event) {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (!isEmptyErrors(nextErrors)) return;
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 600);
  }

  const contactRows = [
    { icon: HiEnvelope, label: "Email", value: CONTACT_PLACEHOLDERS.email },
    { icon: HiPhone, label: "Phone", value: CONTACT_PLACEHOLDERS.phone },
    { icon: HiMapPin, label: "Region", value: CONTACT_PLACEHOLDERS.region },
  ];

  return (
    <div>
      <PageMeta
        title="Contact"
        description="Contact form prototype for Jobs Mania - Freefund. Messages are not delivered yet."
      />

      <section className="border-b border-line bg-secondary">
        <div className="page-shell py-10 lg:py-14">
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Get in touch"
            description="This form is a layout and validation prototype. Messages are not emailed or stored on a server until a later integration is configured."
          />
        </div>
      </section>

      <div className="page-shell py-10">
        <div className="grid items-start gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {status === "success" ? (
            <div className="surface-panel p-6 sm:p-8">
              <span className="icon-tile icon-tile-solid icon-tile-lg">
                <HiCheckCircle aria-hidden="true" size={26} />
              </span>
              <h2 className="mt-5 text-xl sm:text-2xl">Prototype message captured locally</h2>
              <p className="mt-2 max-w-lg text-muted">
                No message has been delivered. Please use the placeholder contact details only after the owner replaces
                them with verified information.
              </p>
            </div>
          ) : (
            <form className="surface-panel p-6 sm:p-8" onSubmit={onSubmit} noValidate>
              <div className="flex items-start gap-3 border-b border-line pb-6">
                <span className="icon-tile icon-tile-solid">
                  <HiChatBubbleLeftRight aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl">Send a message</h2>
                  <p className="mt-1 text-sm text-muted">All fields are required for validation testing.</p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
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
                  {errors.name ? <p id="contact-name-error" className="field-error">{errors.name}</p> : null}
                </label>
                <label>
                  <span className="field-label">Email (required)</span>
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
                  {errors.email ? <p id="contact-email-error" className="field-error">{errors.email}</p> : null}
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
                  {errors.subject ? <p id="contact-subject-error" className="field-error">{errors.subject}</p> : null}
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
                  {errors.message ? <p id="contact-message-error" className="field-error">{errors.message}</p> : null}
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted sm:max-w-xs">
                  Demo only. Nothing is delivered until a backend is connected.
                </p>
                <button type="submit" className="btn-primary sm:w-auto" disabled={status === "loading"}>
                  {status === "loading" ? "Working…" : "Send prototype message"}
                </button>
              </div>
            </form>
          )}

          <aside className="surface-panel p-6 sm:p-8">
            <p className="eyebrow">Direct details</p>
            <h2 className="mt-3 text-xl">Contact placeholders</h2>
            <p className="mt-2 text-sm text-muted">Replace with verified details before launch.</p>

            <ul className="mt-5 grid gap-3">
              {contactRows.map((row) => {
                const Icon = row.icon;
                return (
                  <li key={row.label} className="surface-soft flex items-start gap-3 p-4">
                    <span className="icon-tile">
                      <Icon aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                        {row.label}
                      </p>
                      <p className="mt-1 break-words text-sm">{row.value}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="mt-5 text-xs text-muted">
              These details are placeholders. Do not treat them as live business contact information.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
