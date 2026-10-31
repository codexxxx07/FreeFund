import { useState } from "react";
import { HiPlus, HiTrash } from "react-icons/hi2";
import { uid } from "../../utils/id";

const SKILL_SUGGESTIONS = ["Excel", "Chat support", "Data entry", "Email writing", "CRM"];

function Field({ label, hint, error, errorId, children, full = false }) {
  return (
    <label className="ed-field" style={full ? { gridColumn: "1 / -1" } : undefined}>
      <span className="ed-field__label">{label}</span>
      {children}
      {hint ? <span style={{ fontSize: "0.74rem", lineHeight: 1.5, color: "var(--muted)" }}>{hint}</span> : null}
      {error ? (
        <span className="ed-error" id={errorId}>
          {error}
        </span>
      ) : null}
    </label>
  );
}

function Repeater({ index, title, onRemove, removeLabel, children }) {
  return (
    <div className="rb-repeater">
      <div className="rb-repeater__head">
        <span>{title}</span>
        <button type="button" className="rb-remove" onClick={onRemove} aria-label={removeLabel}>
          <HiTrash aria-hidden="true" size={13} />
          Remove
        </button>
      </div>
      <div className="rb-form-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
        {children}
      </div>
      <span className="sr-only">{`Entry ${index + 1}`}</span>
    </div>
  );
}

/**
 * Step form for the resume editor. Only the active step renders, keeping the
 * editor compact; every change reports upward so the preview and ATS score stay
 * live. Data shape is unchanged from the original builder, so existing
 * localStorage drafts still load.
 */
export default function ResumeForm({ step, data, setData, errors = {} }) {
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
    setData((current) => ({
      ...current,
      [listName]: current[listName].filter((_, i) => i !== index),
    }));
  }

  function addSkill(name) {
    const value = String(name ?? skillDraft).trim();
    if (!value) return;
    setData((current) => {
      if (current.skills.some((skill) => skill.name.toLowerCase() === value.toLowerCase())) return current;
      return { ...current, skills: [...current.skills, { id: uid(), name: value }] };
    });
    setSkillDraft("");
  }

  function removeSkill(id) {
    setData((current) => ({ ...current, skills: current.skills.filter((skill) => skill.id !== id) }));
  }

  if (step === 0) {
    return (
      <div className="rb-form-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <Field
          label="Full name (required)"
          error={errors.fullName}
          errorId="resume-fullName-error"
        >
          <input
            id="resume-fullName"
            className="ed-input"
            value={data.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "resume-fullName-error" : undefined}
          />
        </Field>

        <Field label="Target role title">
          <input
            className="ed-input"
            placeholder="Customer Support Executive"
            value={data.jobTitle}
            onChange={(event) => updateField("jobTitle", event.target.value)}
            autoComplete="organization-title"
          />
        </Field>

        <Field label="Email (required)" error={errors.email} errorId="resume-email-error">
          <input
            id="resume-email"
            className="ed-input"
            type="email"
            value={data.email}
            onChange={(event) => updateField("email", event.target.value)}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "resume-email-error" : undefined}
          />
        </Field>

        <Field label="Phone">
          <input
            className="ed-input"
            type="tel"
            value={data.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            autoComplete="tel"
          />
        </Field>

        <Field label="Location">
          <input
            className="ed-input"
            placeholder="City, State"
            value={data.location}
            onChange={(event) => updateField("location", event.target.value)}
            autoComplete="address-level2"
          />
        </Field>

        <Field label="Links (one per line)" hint="Only links you own. Portfolio, LinkedIn or GitHub.">
          <textarea
            className="ed-textarea"
            style={{ minHeight: "86px" }}
            value={data.links}
            onChange={(event) => updateField("links", event.target.value)}
          />
        </Field>

        <Field
          label="Professional summary"
          full
          hint="Three or four lines: who you are, what you do, what you want next. Aim for 40+ words."
        >
          <textarea
            className="ed-textarea"
            style={{ minHeight: "120px" }}
            value={data.summary}
            onChange={(event) => updateField("summary", event.target.value)}
          />
        </Field>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div style={{ display: "grid", gap: "0.9rem" }}>
        <p style={{ fontSize: "0.84rem", lineHeight: 1.6 }}>
          Most recent first. Internships, part-time work and volunteering all count. Two or three bullets
          per role, one honest number where you can.
        </p>

        {data.experience.length === 0 ? (
          <p style={{ border: "1px dashed var(--line)", padding: "1rem", fontSize: "0.86rem" }}>
            No experience added yet. If this is your first role, include an internship, a college project
            with a real outcome, or substantial volunteering.
          </p>
        ) : null}

        {data.experience.map((entry, index) => (
          <Repeater
            key={entry.id}
            index={index}
            title={`Experience ${index + 1}`}
            removeLabel={`Remove experience ${index + 1}`}
            onRemove={() => removeItem("experience", index)}
          >
            <Field label="Role / title">
              <input
                className="ed-input"
                value={entry.role}
                onChange={(event) => updateItem("experience", index, "role", event.target.value)}
              />
            </Field>
            <Field label="Employer">
              <input
                className="ed-input"
                value={entry.company}
                onChange={(event) => updateItem("experience", index, "company", event.target.value)}
              />
            </Field>
            <Field label="Location">
              <input
                className="ed-input"
                placeholder="Remote / City"
                value={entry.location}
                onChange={(event) => updateItem("experience", index, "location", event.target.value)}
              />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <Field label="From">
                <input
                  className="ed-input"
                  placeholder="Jan 2024"
                  value={entry.start}
                  onChange={(event) => updateItem("experience", index, "start", event.target.value)}
                />
              </Field>
              <Field label="To">
                <input
                  className="ed-input"
                  placeholder="Present"
                  value={entry.end}
                  onChange={(event) => updateItem("experience", index, "end", event.target.value)}
                />
              </Field>
            </div>
            <Field label="What you did (one point per line)" full>
              <textarea
                className="ed-textarea"
                value={entry.description}
                onChange={(event) => updateItem("experience", index, "description", event.target.value)}
              />
            </Field>
          </Repeater>
        ))}

        <button
          type="button"
          className="ed-btn rb-add"
          onClick={() =>
            addItem("experience", { role: "", company: "", location: "", start: "", end: "", description: "" })
          }
        >
          <HiPlus aria-hidden="true" size={15} />
          Add experience
        </button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div style={{ display: "grid", gap: "0.9rem" }}>
        <p style={{ fontSize: "0.84rem", lineHeight: 1.6 }}>
          Degrees, diplomas and schooling. Add the qualification first, then the institution, then dates.
        </p>

        {data.education.length === 0 ? (
          <p style={{ border: "1px dashed var(--line)", padding: "1rem", fontSize: "0.86rem" }}>
            No education added yet. Include the highest qualification you have completed or are completing.
          </p>
        ) : null}

        {data.education.map((entry, index) => (
          <Repeater
            key={entry.id}
            index={index}
            title={`Education ${index + 1}`}
            removeLabel={`Remove education ${index + 1}`}
            onRemove={() => removeItem("education", index)}
          >
            <Field label="Institution">
              <input
                className="ed-input"
                value={entry.school}
                onChange={(event) => updateItem("education", index, "school", event.target.value)}
              />
            </Field>
            <Field label="Qualification">
              <input
                className="ed-input"
                placeholder="B.Com / Diploma in …"
                value={entry.degree}
                onChange={(event) => updateItem("education", index, "degree", event.target.value)}
              />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <Field label="From">
                <input
                  className="ed-input"
                  placeholder="2020"
                  value={entry.start}
                  onChange={(event) => updateItem("education", index, "start", event.target.value)}
                />
              </Field>
              <Field label="To">
                <input
                  className="ed-input"
                  placeholder="2023"
                  value={entry.end}
                  onChange={(event) => updateItem("education", index, "end", event.target.value)}
                />
              </Field>
            </div>
            <Field label="Detail (optional)" full>
              <input
                className="ed-input"
                placeholder="Grade, honours or relevant coursework"
                value={entry.detail}
                onChange={(event) => updateItem("education", index, "detail", event.target.value)}
              />
            </Field>
          </Repeater>
        ))}

        <button
          type="button"
          className="ed-btn rb-add"
          onClick={() => addItem("education", { school: "", degree: "", start: "", end: "", detail: "" })}
        >
          <HiPlus aria-hidden="true" size={15} />
          Add education
        </button>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        <p style={{ fontSize: "0.84rem", lineHeight: 1.6 }}>
          Use the words from the job ads you are targeting — but only skills you can demonstrate in an
          interview. Five is the minimum; eight is comfortable.
        </p>

        <div className="rb-skill-list">
          {data.skills.length === 0 ? (
            <p style={{ fontSize: "0.84rem", paddingBlock: "0.3rem" }}>No skills added yet.</p>
          ) : null}
          {data.skills.map((skill) => (
            <span className="rb-skill" key={skill.id}>
              {skill.name}
              <button type="button" onClick={() => removeSkill(skill.id)} aria-label={`Remove skill ${skill.name}`}>
                ×
              </button>
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 220px" }}>
            <Field label="Add a skill">
              <input
                className="ed-input"
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
          <button type="button" className="ed-btn ed-btn--lime" onClick={() => addSkill()} disabled={!skillDraft.trim()}>
            <HiPlus aria-hidden="true" size={15} />
            Add
          </button>
        </div>

        <div>
          <p className="ed-field__label" style={{ marginBottom: "0.45rem" }}>
            Quick add
          </p>
          <div className="rb-skill-list">
            {SKILL_SUGGESTIONS.filter(
              (suggestion) => !data.skills.some((skill) => skill.name.toLowerCase() === suggestion.toLowerCase()),
            ).map((suggestion) => (
              <button
                type="button"
                key={suggestion}
                className="ed-btn"
                style={{ minHeight: "34px", padding: "0.3rem 0.6rem", fontSize: "0.68rem" }}
                onClick={() => addSkill(suggestion)}
              >
                + {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: "1.25rem" }}>
      <div style={{ display: "grid", gap: "0.9rem" }}>
        <p style={{ fontSize: "0.84rem", lineHeight: 1.6 }}>
          Optional, and especially useful with limited work experience. A project is anything you built,
          ran or organised — with a result you can describe.
        </p>

        {data.projects.map((entry, index) => (
          <Repeater
            key={entry.id}
            index={index}
            title={`Project ${index + 1}`}
            removeLabel={`Remove project ${index + 1}`}
            onRemove={() => removeItem("projects", index)}
          >
            <Field label="Project name">
              <input
                className="ed-input"
                value={entry.name}
                onChange={(event) => updateItem("projects", index, "name", event.target.value)}
              />
            </Field>
            <Field label="Link (optional)">
              <input
                className="ed-input"
                placeholder="https://"
                value={entry.link}
                onChange={(event) => updateItem("projects", index, "link", event.target.value)}
              />
            </Field>
            <Field label="What it is and what you did" full>
              <textarea
                className="ed-textarea"
                value={entry.description}
                onChange={(event) => updateItem("projects", index, "description", event.target.value)}
              />
            </Field>
          </Repeater>
        ))}

        <button
          type="button"
          className="ed-btn rb-add"
          onClick={() => addItem("projects", { name: "", link: "", description: "" })}
        >
          <HiPlus aria-hidden="true" size={15} />
          Add project
        </button>
      </div>

      <div style={{ display: "grid", gap: "0.9rem", borderTop: "1px solid var(--line)", paddingTop: "1.25rem" }}>
        <p className="ed-label">[ Certifications & achievements ]</p>
        {data.credentials.map((entry, index) => (
          <div key={entry.id} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <Field label={`Entry ${index + 1}`}>
                <input
                  className="ed-input"
                  placeholder="Advanced Excel certification, 2024"
                  value={entry.text}
                  onChange={(event) => updateItem("credentials", index, "text", event.target.value)}
                />
              </Field>
            </div>
            <button
              type="button"
              className="rb-remove"
              style={{ minHeight: "46px" }}
              onClick={() => removeItem("credentials", index)}
              aria-label={`Remove entry ${index + 1}`}
            >
              <HiTrash aria-hidden="true" size={14} />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="ed-btn rb-add"
          onClick={() => addItem("credentials", { text: "" })}
        >
          <HiPlus aria-hidden="true" size={15} />
          Add certification
        </button>
      </div>
    </div>
  );
}
