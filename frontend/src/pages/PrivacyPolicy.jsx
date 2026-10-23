import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import { BRAND_NAME, IS_DEMO } from "../data/constants";

export default function PrivacyPolicy() {
  return (
    <div>
      <PageMeta title="Privacy Policy" description={`Privacy information for ${BRAND_NAME}.`} />

      <section className="border-b border-line bg-secondary">
        <div className="page-shell py-10 lg:py-14">
          <SectionHeading
            as="h1"
            eyebrow="Legal"
            title="Privacy Policy"
            description="Last updated: 23 October 2026. Legal entity details are pending confirmation."
          />
        </div>
      </section>

      <div className="page-shell py-10">
        <article className="surface-panel mx-auto max-w-4xl p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2 border-b border-line pb-6">
            <span className="badge badge-primary">Draft document</span>
            <span className="badge">Requires owner confirmation</span>
          </div>

          <p className="mt-6 text-muted">
            This page describes the intended use of candidate information on {BRAND_NAME}. It is not a verified legal
            compliance statement. Business-specific facts marked below must be confirmed by the owner before public
            launch.
          </p>

          <div className="mt-8 grid gap-8">
            <section>
              <h2 className="text-xl sm:text-2xl">What this site collects</h2>
              <p className="mt-2 text-muted">
                {IS_DEMO
                  ? "The application and contact forms validate input in the browser. Sample submissions may be stored in session storage on the visitor's device. They are not sent to a server, email inbox, or CRM."
                  : "The application and contact forms collect the details you enter so they can be used for recruitment-related communication."}
              </p>
            </section>

            <section className="border-t border-line pt-8">
              <h2 className="text-xl sm:text-2xl">Intended future processing</h2>
              <p className="mt-2 text-muted">
                When a backend is added, candidate details such as name, mobile number, email, education, experience,
                preferred location, Job ID, Job title, and resume files are expected to be used only for
                recruitment-related communication and hiring workflows. [To confirm: data controller legal name,
                registered address, retention period, and DPO or grievance contact.]
              </p>
            </section>

            <section className="border-t border-line pt-8">
              <h2 className="text-xl sm:text-2xl">Sharing</h2>
              <p className="mt-2 text-muted">
                Candidate information should not be displayed publicly. Sharing with employers or processors, if any,
                must be documented before launch. [To confirm: list of processors and employer disclosure rules.]
              </p>
            </section>

            <section className="border-t border-line pt-8">
              <h2 className="text-xl sm:text-2xl">Requests</h2>
              <p className="mt-2 text-muted">
                Candidates should be able to ask about access, correction, or deletion once a production process
                exists. This site does not yet provide that workflow.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}

