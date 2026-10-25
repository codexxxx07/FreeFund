/**
 * Live resume preview.
 * Single-column, plain-text-first layout so the printed/PDF output stays
 * readable for both recruiters and applicant tracking systems.
 * The `.resume-sheet` class is the print target (see styles/index.css).
 */

function lines(text) {
  return String(text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function hasEntry(entry, fields) {
  return fields.some((field) => String(entry[field] || "").trim());
}

function dateRange(start, end) {
  const from = String(start || "").trim();
  const to = String(end || "").trim();
  if (!from && !to) return "";
  return `${from || "—"} – ${to || "Present"}`;
}

function Section({ title, children }) {
  return (
    <section className="mb-5">
      <h2 className="mb-2 border-b border-[#d4d4d4] pb-1 text-[0.82rem] font-bold uppercase tracking-[0.14em]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function ResumePreview({ data }) {
  const contactBits = [data.email, data.phone, data.location].filter((value) => String(value || "").trim());
  const links = lines(data.links);
  const experience = data.experience.filter((entry) => hasEntry(entry, ["role", "company", "description"]));
  const education = data.education.filter((entry) => hasEntry(entry, ["school", "degree"]));
  const projects = data.projects.filter((entry) => hasEntry(entry, ["name", "description"]));
  const credentials = data.credentials.filter((entry) => String(entry.text || "").trim());
  const skills = data.skills.filter((entry) => String(entry.name || "").trim());

  const isEmpty =
    !String(data.fullName || "").trim() &&
    !String(data.summary || "").trim() &&
    experience.length === 0 &&
    education.length === 0 &&
    skills.length === 0 &&
    projects.length === 0 &&
    credentials.length === 0;

  return (
    <article className="resume-sheet" aria-label="Resume preview">
      <header className="mb-5">
        <h1 className="text-2xl font-bold leading-tight">
          {String(data.fullName || "").trim() || "Your Name"}
        </h1>
        {String(data.jobTitle || "").trim() ? (
          <p className="mt-0.5 text-[0.98rem] font-semibold">{data.jobTitle}</p>
        ) : null}
        {contactBits.length || links.length ? (
          <p className="mt-1.5 break-words text-[0.86rem]">
            {[...contactBits, ...links].join("  ·  ")}
          </p>
        ) : null}
      </header>

      {isEmpty ? (
        <div className="border border-dashed border-[#d4d4d4] p-6 text-center text-[0.9rem]">
          <p className="font-semibold">Your preview appears here as you type.</p>
          <p className="mt-1.5">
            Start with your name and a short professional summary, then add experience, education and skills. Use
            Download PDF when you are ready.
          </p>
        </div>
      ) : (
        <>
          {String(data.summary || "").trim() ? (
            <Section title="Professional Summary">
              <p className="whitespace-pre-line text-[0.9rem] leading-relaxed">{data.summary}</p>
            </Section>
          ) : null}

          {experience.length ? (
            <Section title="Experience">
              <div className="grid gap-3.5">
                {experience.map((entry) => (
                  <div key={entry.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <p className="text-[0.95rem] font-semibold">
                        {entry.role}
                        {entry.company ? ` · ${entry.company}` : ""}
                      </p>
                      <p className="text-[0.82rem]">{dateRange(entry.start, entry.end)}</p>
                    </div>
                    {entry.location ? <p className="text-[0.84rem]">{entry.location}</p> : null}
                    {lines(entry.description).length ? (
                      <ul className="mt-1.5 grid gap-1 pl-4 text-[0.88rem] leading-relaxed">
                        {lines(entry.description).map((line) => (
                          <li key={line} className="list-disc">
                            {line}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          {education.length ? (
            <Section title="Education">
              <div className="grid gap-2.5">
                {education.map((entry) => (
                  <div key={entry.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <p className="text-[0.95rem] font-semibold">
                        {entry.degree}
                        {entry.school ? ` · ${entry.school}` : ""}
                      </p>
                      <p className="text-[0.82rem]">{dateRange(entry.start, entry.end)}</p>
                    </div>
                    {entry.detail ? <p className="text-[0.86rem]">{entry.detail}</p> : null}
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          {skills.length ? (
            <Section title="Skills">
              <p className="text-[0.9rem] leading-relaxed">{skills.map((skill) => skill.name).join(" · ")}</p>
            </Section>
          ) : null}

          {projects.length ? (
            <Section title="Projects">
              <div className="grid gap-2.5">
                {projects.map((entry) => (
                  <div key={entry.id}>
                    <p className="text-[0.95rem] font-semibold">
                      {entry.name}
                      {entry.link ? <span className="ml-2 text-[0.82rem] font-normal">{entry.link}</span> : null}
                    </p>
                    {entry.description ? (
                      <p className="mt-0.5 text-[0.88rem] leading-relaxed">{entry.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          {credentials.length ? (
            <Section title="Certifications & Achievements">
              <ul className="grid gap-1 pl-4 text-[0.88rem] leading-relaxed">
                {credentials.map((entry) => (
                  <li key={entry.id} className="list-disc">
                    {entry.text}
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}
        </>
      )}
    </article>
  );
}
