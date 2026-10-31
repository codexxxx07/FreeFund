/**
 * Live A4 resume preview. Four templates share one semantic structure; CSS
 * changes the masthead, rules, density and section headings. All templates stay
 * single-column so the printed output remains readable for recruiters and
 * screening software.
 */

function lines(value) {
  return String(value || "")
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

const TEMPLATE_LABELS = {
  folio: { summary: "Profile", experience: "Experience", education: "Education", skills: "Skills", projects: "Projects", credentials: "Certifications" },
  ledger: { summary: "Summary", experience: "Experience", education: "Education", skills: "Skills", projects: "Selected Projects", credentials: "Certifications" },
  grid: { summary: "Professional Summary", experience: "Work Experience", education: "Education", skills: "Core Skills", projects: "Projects", credentials: "Certifications" },
  compact: { summary: "Profile", experience: "Experience", education: "Education", skills: "Skills", projects: "Projects", credentials: "Credentials" },
};

function Section({ title, children }) {
  return (
    <section className="r-sec">
      <h2 className="r-sec__h">{title}</h2>
      {children}
    </section>
  );
}

export default function ResumePreview({ data, template = "folio" }) {
  const labels = TEMPLATE_LABELS[template] || TEMPLATE_LABELS.folio;
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
    <article className="rb-a4" data-template={template} aria-label="Resume A4 preview">
      <div className="rb-a4__inner">
        <header className="r-hd">
          <div>
            <h1 className="r-name">{String(data.fullName || "").trim() || "Your Name"}</h1>
            {String(data.jobTitle || "").trim() ? <p className="r-title">{data.jobTitle}</p> : null}
          </div>
          {contactBits.length || links.length ? (
            <p className="r-contact">{[...contactBits, ...links].join("  ·  ")}</p>
          ) : null}
        </header>

        {isEmpty ? (
          <div className="r-empty" style={{ marginTop: "8cqw" }}>
            <p style={{ fontWeight: 700 }}>Your A4 page appears here as you type.</p>
            <p style={{ marginTop: "1.5cqw" }}>
              Start with your name, target role and a short summary. Then add experience, education and
              skills.
            </p>
          </div>
        ) : (
          <>
            {String(data.summary || "").trim() ? (
              <Section title={labels.summary}>
                <p style={{ fontSize: "1.48cqw", lineHeight: 1.45, whiteSpace: "pre-line" }}>{data.summary}</p>
              </Section>
            ) : null}

            {experience.length ? (
              <Section title={labels.experience}>
                {experience.map((entry) => (
                  <div className="r-entry" key={entry.id}>
                    <div className="r-entry__top">
                      <p className="r-entry__role">
                        {entry.role}
                        {entry.company ? ` · ${entry.company}` : ""}
                      </p>
                      <p className="r-entry__date">{dateRange(entry.start, entry.end)}</p>
                    </div>
                    {entry.location ? <p className="r-entry__sub">{entry.location}</p> : null}
                    {lines(entry.description).length ? (
                      <ul className="r-list">
                        {lines(entry.description).map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </Section>
            ) : null}

            {education.length ? (
              <Section title={labels.education}>
                {education.map((entry) => (
                  <div className="r-entry" key={entry.id}>
                    <div className="r-entry__top">
                      <p className="r-entry__role">
                        {entry.degree}
                        {entry.school ? ` · ${entry.school}` : ""}
                      </p>
                      <p className="r-entry__date">{dateRange(entry.start, entry.end)}</p>
                    </div>
                    {entry.detail ? <p className="r-entry__sub">{entry.detail}</p> : null}
                  </div>
                ))}
              </Section>
            ) : null}

            {skills.length ? (
              <Section title={labels.skills}>
                <p className="r-skills">{skills.map((skill) => skill.name).join(" · ")}</p>
              </Section>
            ) : null}

            {projects.length ? (
              <Section title={labels.projects}>
                {projects.map((entry) => (
                  <div className="r-entry" key={entry.id}>
                    <div className="r-entry__top">
                      <p className="r-entry__role">{entry.name}</p>
                      {entry.link ? <p className="r-entry__date">{entry.link}</p> : null}
                    </div>
                    {entry.description ? <p className="r-entry__sub">{entry.description}</p> : null}
                  </div>
                ))}
              </Section>
            ) : null}

            {credentials.length ? (
              <Section title={labels.credentials}>
                <ul className="r-list">
                  {credentials.map((entry) => (
                    <li key={entry.id}>{entry.text}</li>
                  ))}
                </ul>
              </Section>
            ) : null}
          </>
        )}
      </div>
    </article>
  );
}
