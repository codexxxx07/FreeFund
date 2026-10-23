import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import { BRAND_NAME } from "../data/constants";

export default function PrivacyPolicy() {
  return (
    <div className="page-shell py-10">
      <PageMeta title="Privacy Policy" description={`Privacy information for the ${BRAND_NAME} website prototype.`} />
      <SectionHeading
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: 23 October 2026. Legal entity details are pending confirmation."
      />
      <article className="surface-panel mt-8 space-y-6 p-6 sm:p-10">
        <p className="text-ink-muted">
          This page describes the intended use of candidate information on {BRAND_NAME}. It is not a verified legal
          compliance statement. Business-specific facts marked below must be confirmed by the owner before public launch.
        </p>
        <section className="space-y-3">
          <h2 className="text-2xl">What this prototype collects</h2>
          <p className="text-ink-muted">
            Phase 1 is frontend-only. The application and contact forms validate input in the browser. Demo submissions may
            be stored in session storage on the visitor&apos;s device. They are not sent to a server, email inbox, or CRM.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl">Intended future processing</h2>
          <p className="text-ink-muted">
            When a backend is added, candidate details such as name, mobile number, email, education, experience, preferred
            location, Job ID, Job title, and resume files are expected to be used only for recruitment-related communication
            and hiring workflows. [To confirm: data controller legal name, registered address, retention period, and DPO or
            grievance contact.]
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl">Sharing</h2>
          <p className="text-ink-muted">
            Candidate information should not be displayed publicly. Sharing with employers or processors, if any, must be
            documented before launch. [To confirm: list of processors and employer disclosure rules.]
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl">Requests</h2>
          <p className="text-ink-muted">
            Candidates should be able to ask about access, correction, or deletion once a production process exists. This
            prototype does not yet provide that workflow.
          </p>
        </section>
      </article>
    </div>
  );
}
