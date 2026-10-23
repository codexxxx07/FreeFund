import { useState } from "react";
import { HiCheckCircle } from "react-icons/hi2";
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

  return (
    <div className="page-shell py-10">
      <PageMeta title="Contact" description="Contact form prototype for Jobs Mania - Freefund. Messages are not delivered yet." />
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch"
        description="This form is a layout and validation prototype. Messages are not emailed or stored on a server until a later integration is configured."
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {status === "success" ? (
          <div className="surface-panel relative overflow-hidden p-6 sm:p-8">
            <div className="relative flex flex-col items-start gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent">
                <HiCheckCircle aria-hidden="true" size={28} />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl">Prototype message captured locally</h2>
                <p className="mt-2 text-ink-muted">
                  No message has been delivered. Please use the placeholder contact details only after the owner
                  replaces them with verified information.
                </p>
              </div>
            </div>
            <span className="skew-decor -right-14 -top-10 h-32 w-32 opacity-40" aria-hidden="true" />
          </div>
        ) : (
          <form className="surface-panel relative grid gap-5 overflow-hidden p-6 sm:p-8" onSubmit={onSubmit} noValidate>
            <div className="relative grid gap-5 sm:grid-cols-2">
              <label className="sm:col-span-1">
                <span className="field-label">Name (required)</span>
                <input className="field-input" name="name" value={values.name} onChange={update} autoComplete="name" />
                {errors.name ? <p className="field-error">{errors.name}</p> : null}
              </label>
              <label className="sm:col-span-1">
                <span className="field-label">Email (required)</span>
                <input className="field-input" type="email" name="email" value={values.email} onChange={update} autoComplete="email" />
                {errors.email ? <p className="field-error">{errors.email}</p> : null}
              </label>
              <label className="sm:col-span-2">
                <span className="field-label">Subject (required)</span>
                <input className="field-input" name="subject" value={values.subject} onChange={update} />
                {errors.subject ? <p className="field-error">{errors.subject}</p> : null}
              </label>
              <label className="sm:col-span-2">
                <span className="field-label">Message (required)</span>
                <textarea className="field-textarea" name="message" value={values.message} onChange={update} />
                {errors.message ? <p className="field-error">{errors.message}</p> : null}
              </label>
            </div>
            <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "loading"}>
              {status === "loading" ? "Working…" : "Send prototype message"}
            </button>
            <span className="skew-decor -bottom-12 -right-16 h-32 w-32 opacity-40" aria-hidden="true" />
          </form>
        )}

        <aside className="surface-panel relative h-fit overflow-hidden p-6 sm:p-8">
          <div className="relative">
            <h2 className="text-xl">Contact placeholders</h2>
            <p className="mt-1 text-sm text-ink-muted">Replace with verified details before launch.</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <span className="block text-xs uppercase tracking-[0.18em] text-ink-muted">Email</span>
                <span className="mt-1 block">{CONTACT_PLACEHOLDERS.email}</span>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-[0.18em] text-ink-muted">Phone</span>
                <span className="mt-1 block">{CONTACT_PLACEHOLDERS.phone}</span>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-[0.18em] text-ink-muted">Region</span>
                <span className="mt-1 block">{CONTACT_PLACEHOLDERS.region}</span>
              </li>
            </ul>
          </div>
          <span className="skew-decor -bottom-12 -right-14 h-28 w-28 opacity-40" aria-hidden="true" />
        </aside>
      </div>
    </div>
  );
}
