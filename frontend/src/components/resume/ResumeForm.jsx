import { useState } from "react";
import { HiPlus, HiTrash } from "react-icons/hi2";
import { uid } from "../../utils/id";

function Field({ label, hint, error, errorId, children }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {children}
      {hint ? <p className="field-hint">{hint}</p> : null}
      {error ? (
        <span className="field-error" id={errorId}>
          {error}
        </span>
      ) : null}
    </label>
  );
}

function RepeaterShell({ index, title, onRemove, removeLabel, children }) {
  return (
    <div className="surface-soft p-4">
      <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{title}</p>
        <button type="button" className="btn-ghost min-h-0 px-2 py-1" onClick={onRemove} aria-label={removeLabel}>
          <HiTrash aria-hidden="true" />
          Remove
        </button>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div>
      <span className="sr-only">{`Entry ${index + 1}`}</span>
    </div>
  );
}

/**
 * Resume Builder form. All data stays in the parent's state; this component
 * only reports changes, so the live preview and local storage stay in sync.
 */
export default function ResumeForm({ data, setData, errors = {} }) {
  const [skillDraft, setSkillDraft] = useState("");

  function updateField(field, value) {
    setData((current) => ({ ...current, [field]: value }));
  }

  function updateItem(listName, index, field, value) {
    setData((current) => ({
      ...current,
      [listName]: current[listName].map((entry, i) => (i === index ? { ...entry, [field]: value } : entry)),
    }));
  }

  function addItem(listName, template) {
    setData((current) => ({ ...current, [listName]: [...current[listName], { id: uid(), ...template }] }));
  }

  function removeItem(listName, index) {
    setData((current) => ({ ...current, [listName]: current[listName].filter((_, i) => i !== index) }));
  }

  function addSkill() {
    const name = skillDraft.trim();
    if (!name) return;
    setData((current) => ({ ...current, skills: [...current.skills, { id: uid(), name }] }));
    setSkillDraft("");
  }

  function removeSkill(id) {
    setData((current) => ({ ...current, skills: current.skills.filter((skill) => skill.id !== id) }));
  }

  return (
    <div className="grid gap-6">
      {/* 1 — Personal details */}
      <section className="surface-panel p-6">
        <div className="flex items-start gap-3 border-b border-line pb-5">
          <span className="icon-tile icon-tile-solid">01</span>
          <div>
            <h2 className="text-xl">Personal details</h2>
            <p className="mt-1 text-sm text-muted">How an employer reaches you.</p>
          </div>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field label="Full name (required)" error={errors.fullName} errorId="resume-fullName-error">
            <input
              id="resume-fullName"
              className="field-input"
              value={data.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              autoComplete="name"
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "resume-fullName-error" : undefined}
            />
          </Field>
          <Field label="Professional title">
            <input
              className="field-input"
              placeholder="Customer Support Executive"
              value={data.jobTitle}
              onChange={(event) => updateField("jobTitle", event.target.value)}
              autoComplete="organization-title"
            />
          </Field>
          <Field label="Email address (required)" error={errors.email} errorId="resume-email-error">
            <input
              id="resume-email"
              className="field-input"
              type="email"
              value={data.email}
              onChange={(event) => updateField("email", event.target.value)}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "resume-email-error" : undefined}
            />
          </Field>
          <Field label="Phone number">
            <input
              className="field-input"
              type="tel"
              value={data.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              autoComplete="tel"
            />
          </Field>
          <Field label="Location">
            <input
              className="field-input"
              placeholder="City, State"
              value={data.location}
              onChange={(event) => updateField("location", event.target.value)}
              autoComplete="address-level2"
            />
          </Field>
          <Field
            label="Links (one per line)"
            hint="Portfolio, LinkedIn or GitHub. Only add links you actually own."
          >
            <textarea
              className="field-textarea min-h-[5.5rem]"
              value={data.links}
              onChange={(event) => updateField("links", event.target.value)}
            />
          </Field>
        </div>
      </section>

      {/* 2 — Summary */}
      <section className="surface-panel p-6">
        <div className="flex items-start gap-3 border-b border-line pb-5">
          <span className="icon-tile icon-tile-solid">02</span>
          <div>
            <h2 className="text-xl">Professional summary</h2>
            <p className="mt-1 text-sm text-muted">Three or four lines: who you are, what you do, what you want next.</p>
          </div>
        </div>
        <div className="mt-5">
          <Field
            label="Summary"
            hint="Example: Customer support professional with two years of experience handling chat and email queries, looking for a work-from-home role where accuracy and patience matter."
          >
            <textarea
              className="field-textarea"
              value={data.summary}
              onChange={(event) => updateField("summary", event.target.value)}
            />
          </Field>
        </div>
      </section>

      {/* 3 — Experience */}
      <section className="surface-panel p-6">
        <div className="flex items-start justify-between gap-3 border-b border-line pb-5">
          <div className="flex items-start gap-3">
            <span className="icon-tile icon-tile-solid">03</span>
            <div>
              <h2 className="text-xl">Work experience</h2>
              <p className="mt-1 text-sm text-muted">Jobs, internships and volunteering. Most recent first.</p>
            </div>
          </div>
          <button
            type="button"
            className="btn-secondary shrink-0"
            onClick={() =>
              addItem("experience", { role: "", company: "", location: "", start: "", end: "", description: "" })
            }
          >
            <HiPlus aria-hidden="true" />
            Add
          </button>
        </div>
        <div className="mt-5 grid gap-4">
          {data.experience.length === 0 ? (
            <p className="surface-inset p-4 text-sm text-muted">
              No experience added yet. If this is your first role, include internships, part-time work or substantial
              college projects.
            </p>
          ) : null}
          {data.experience.map((entry, index) => (
            <RepeaterShell
              key={entry.id}
              index={index}
              title={`Experience ${index + 1}`}
              removeLabel={`Remove experience ${index + 1}`}
              onRemove={() => removeItem("experience", index)}
            >
              <Field label="Role / title">
                <input
                  className="field-input"
                  value={entry.role}
                  onChange={(event) => updateItem("experience", index, "role", event.target.value)}
                />
              </Field>
              <Field label="Employer">
                <input
                  className="field-input"
                  value={entry.company}
                  onChange={(event) => updateItem("experience", index, "company", event.target.value)}
                />
              </Field>
              <Field label="Location">
                <input
                  className="field-input"
                  placeholder="Remote / City"
                  value={entry.location}
                  onChange={(event) => updateItem("experience", index, "location", event.target.value)}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="From">
                  <input
                    className="field-input"
                    placeholder="Jan 2024"
                    value={entry.start}
                    onChange={(event) => updateItem("experience", index, "start", event.target.value)}
                  />
                </Field>
                <Field label="To">
                  <input
                    className="field-input"
                    placeholder="Present"
                    value={entry.end}
                    onChange={(event) => updateItem("experience", index, "end", event.target.value)}
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="What you did" hint="One point per line. Start with an action word and add a number where you can.">
                  <textarea
                    className="field-textarea"
                    value={entry.description}
                    onChange={(event) => updateItem("experience", index, "description", event.target.value)}
                  />
                </Field>
              </div>
            </RepeaterShell>
          ))}
        </div>
      </section>

      {/* 4 — Education */}
      <section className="surface-panel p-6">
        <div className="flex items-start justify-between gap-3 border-b border-line pb-5">
          <div className="flex items-start gap-3">
            <span className="icon-tile icon-tile-solid">04</span>
            <div>
              <h2 className="text-xl">Education</h2>
              <p className="mt-1 text-sm text-muted">Degrees, diplomas and schooling.</p>
            </div>
          </div>
          <button
            type="button"
            className="btn-secondary shrink-0"
            onClick={() => addItem("education", { school: "", degree: "", start: "", end: "", detail: "" })}
          >
            <HiPlus aria-hidden="true" />
            Add
          </button>
        </div>
        <div className="mt-5 grid gap-4">
          {data.education.length === 0 ? (
            <p className="surface-inset p-4 text-sm text-muted">No education added yet.</p>
          ) : null}
          {data.education.map((entry, index) => (
            <RepeaterShell
              key={entry.id}
              index={index}
              title={`Education ${index + 1}`}
              removeLabel={`Remove education ${index + 1}`}
              onRemove={() => removeItem("education", index)}
            >
              <Field label="Institution">
                <input
                  className="field-input"
                  value={entry.school}
                  onChange={(event) => updateItem("education", index, "school", event.target.value)}
                />
              </Field>
              <Field label="Qualification">
                <input
                  className="field-input"
                  placeholder="B.Com / Diploma in ..."
                  value={entry.degree}
                  onChange={(event) => updateItem("education", index, "degree", event.target.value)}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="From">
                  <input
                    className="field-input"
                    placeholder="2020"
                    value={entry.start}
                    onChange={(event) => updateItem("education", index, "start", event.target.value)}
                  />
                </Field>
                <Field label="To">
                  <input
                    className="field-input"
                    placeholder="2023"
                    value={entry.end}
                    onChange={(event) => updateItem("education", index, "end", event.target.value)}
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Detail" hint="Optional: grade, honours, or relevant coursework.">
                  <input
                    className="field-input"
                    value={entry.detail}
                    onChange={(event) => updateItem("education", index, "detail", event.target.value)}
                  />
                </Field>
              </div>
            </RepeaterShell>
          ))}
        </div>
      </section>

      {/* 5 — Skills */}
      <section className="surface-panel p-6">
        <div className="flex items-start gap-3 border-b border-line pb-5">
          <span className="icon-tile icon-tile-solid">05</span>
          <div>
            <h2 className="text-xl">Skills</h2>
            <p className="mt-1 text-sm text-muted">Tools and abilities you can demonstrate in an interview.</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {data.skills.length === 0 ? (
            <p className="surface-inset w-full p-4 text-sm text-muted">
              No skills added yet. Add the ones that appear most often in the job listings you want.
            </p>
          ) : null}
          {data.skills.map((skill) => (
            <span key={skill.id} className="badge badge-neutral px-3 py-1.5 text-sm">
              {skill.name}
              <button
                type="button"
                className="ml-1 rounded focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={() => removeSkill(skill.id)}
                aria-label={`Remove skill ${skill.name}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-3 sm:items-end">
          <div className="min-w-64 flex-1">
            <Field label="Add a skill">
              <input
                className="field-input"
                value={skillDraft}
                placeholder="Excel, chat support, data entry…"
                onChange={(event) => setSkillDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addSkill();
                  }
                }}
              />
            </Field>
          </div>
          <button type="button" className="btn-secondary" onClick={addSkill} disabled={!skillDraft.trim()}>
            <HiPlus aria-hidden="true" />
            Add skill
          </button>
        </div>
      </section>

      {/* 6 — Projects */}
      <section className="surface-panel p-6">
        <div className="flex items-start justify-between gap-3 border-b border-line pb-5">
          <div className="flex items-start gap-3">
            <span className="icon-tile icon-tile-solid">06</span>
            <div>
              <h2 className="text-xl">Projects</h2>
              <p className="mt-1 text-sm text-muted">Optional. Useful when you have limited work experience.</p>
            </div>
          </div>
          <button
            type="button"
            className="btn-secondary shrink-0"
            onClick={() => addItem("projects", { name: "", link: "", description: "" })}
          >
            <HiPlus aria-hidden="true" />
            Add
          </button>
        </div>
        <div className="mt-5 grid gap-4">
          {data.projects.length === 0 ? (
            <p className="surface-inset p-4 text-sm text-muted">No projects added yet.</p>
          ) : null}
          {data.projects.map((entry, index) => (
            <RepeaterShell
              key={entry.id}
              index={index}
              title={`Project ${index + 1}`}
              removeLabel={`Remove project ${index + 1}`}
              onRemove={() => removeItem("projects", index)}
            >
              <Field label="Project name">
                <input
                  className="field-input"
                  value={entry.name}
                  onChange={(event) => updateItem("projects", index, "name", event.target.value)}
                />
              </Field>
              <Field label="Link (optional)">
                <input
                  className="field-input"
                  placeholder="https://"
                  value={entry.link}
                  onChange={(event) => updateItem("projects", index, "link", event.target.value)}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="What it is and what you did">
                  <textarea
                    className="field-textarea"
                    value={entry.description}
                    onChange={(event) => updateItem("projects", index, "description", event.target.value)}
                  />
                </Field>
              </div>
            </RepeaterShell>
          ))}
        </div>
      </section>

      {/* 7 — Certifications and achievements */}
      <section className="surface-panel p-6">
        <div className="flex items-start justify-between gap-3 border-b border-line pb-5">
          <div className="flex items-start gap-3">
            <span className="icon-tile icon-tile-solid">07</span>
            <div>
              <h2 className="text-xl">Certifications & achievements</h2>
              <p className="mt-1 text-sm text-muted">Courses completed, awards, and measurable results.</p>
            </div>
          </div>
          <button
            type="button"
            className="btn-secondary shrink-0"
            onClick={() => addItem("credentials", { text: "" })}
          >
            <HiPlus aria-hidden="true" />
            Add
          </button>
        </div>
        <div className="mt-5 grid gap-4">
          {data.credentials.length === 0 ? (
            <p className="surface-inset p-4 text-sm text-muted">Nothing added yet.</p>
          ) : null}
          {data.credentials.map((entry, index) => (
            <RepeaterShell
              key={entry.id}
              index={index}
              title={`Entry ${index + 1}`}
              removeLabel={`Remove entry ${index + 1}`}
              onRemove={() => removeItem("credentials", index)}
            >
              <div className="sm:col-span-2">
                <Field label="Certification or achievement">
                  <input
                    className="field-input"
                    placeholder="Advanced Excel certification, 2024"
                    value={entry.text}
                    onChange={(event) => updateItem("credentials", index, "text", event.target.value)}
                  />
                </Field>
              </div>
            </RepeaterShell>
          ))}
        </div>
      </section>
    </div>
  );
}
