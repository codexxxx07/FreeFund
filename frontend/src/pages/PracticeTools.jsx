import { useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { HiArrowRight, HiCheckCircle, HiComputerDesktop, HiLanguage } from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import TypingSpeedTest from "../components/tools/TypingSpeedTest";
import QuizTool from "../components/tools/QuizTool";
import { BRAND_NAME } from "../data/constants";
import { PRACTICE_TOOLS, computerQuestions, englishQuestions } from "../data/practiceQuestions";

const TOOL_IDS = PRACTICE_TOOLS.map((tool) => tool.id);

const PRIVACY_NOTES = [
  "Everything runs in your browser — no account, no login, no upload.",
  "Results are shown to you only and are never treated as a certification.",
  "Nothing you type is sent to a server or saved to a third party.",
];

function toolMatches(value) {
  return TOOL_IDS.includes(value);
}

export default function PracticeTools() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeParam = searchParams.get("tool");
  const active = toolMatches(activeParam) ? activeParam : TOOL_IDS[0];
  const tabRefs = useRef([]);

  function selectTool(id, index) {
    const params = new URLSearchParams(searchParams);
    params.set("tool", id);
    setSearchParams(params, { replace: true });
    if (typeof index === "number") tabRefs.current[index]?.focus();
  }

  function onTabKeyDown(event, index) {
    let nextIndex = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % TOOL_IDS.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + TOOL_IDS.length) % TOOL_IDS.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = TOOL_IDS.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    selectTool(TOOL_IDS[nextIndex], nextIndex);
  }

  const activeTool = PRACTICE_TOOLS.find((tool) => tool.id === active);

  return (
    <div>
      <PageMeta
        title="Free Practice Tools"
        description={`Free browser-based typing, English and computer practice tests from ${BRAND_NAME}. No login required.`}
      />

      <section className="border-b border-line bg-secondary">
        <div className="page-shell py-12 sm:py-14">
          <SectionHeading
            as="h1"
            eyebrow="Career resources"
            title="Free Practice Tools"
            description="Three quick, browser-based tools to rehearse the skills most entry-level roles test: typing, written English, and everyday computer knowledge."
          />
          <ul className="mt-7 flex flex-wrap gap-3">
            {PRIVACY_NOTES.map((note) => (
              <li key={note} className="meta-chip">
                <HiCheckCircle aria-hidden="true" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="page-shell py-12 sm:py-14">
        <div
          role="tablist"
          aria-label="Practice tools"
          className="flex flex-wrap gap-2"
        >
          {PRACTICE_TOOLS.map((tool, index) => {
            const selected = tool.id === active;
            return (
              <button
                key={tool.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`tool-tab-${tool.id}`}
                aria-selected={selected}
                aria-controls={`tool-panel-${tool.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectTool(tool.id, index)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className="btn-tab"
              >
                {tool.name}
              </button>
            );
          })}
        </div>

        <div
          id={`tool-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`tool-tab-${active}`}
          className="mt-6"
        >
          {active === "typing" ? <TypingSpeedTest /> : null}
          {active === "english" ? (
            <QuizTool
              title="English Quiz"
              description="Ten multiple-choice questions covering grammar, punctuation, vocabulary and professional usage."
              questions={englishQuestions}
              icon={HiLanguage}
            />
          ) : null}
          {active === "computer" ? (
            <QuizTool
              title="Basic Computer Test"
              description="Ten questions on hardware, files, shortcuts and safe everyday computer use."
              questions={computerQuestions}
              icon={HiComputerDesktop}
            />
          ) : null}
        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="surface-card p-6">
            <p className="eyebrow">Next step</p>
            <h2 className="mt-3 text-xl sm:text-2xl">Turn practice into a stronger application</h2>
            <p className="mt-2 text-sm text-muted">
              {activeTool ? `${activeTool.short} ` : ""}Practice is only useful when it shows up in your resume and
              your interview answers.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/career-guidance" className="btn-primary">
                Career Guidance
                <HiArrowRight aria-hidden="true" />
              </Link>
              <Link to="/resume-builder" className="btn-secondary">
                Resume Builder
              </Link>
            </div>
          </div>
          <div className="surface-card p-6">
            <p className="eyebrow">Results</p>
            <h2 className="mt-3 text-xl sm:text-2xl">Your scores stay on this device</h2>
            <p className="mt-2 text-sm text-muted">
              Practice results are calculated in the browser and disappear when you leave or refresh the page. They are
              practice only — employers do not receive them and they are not a recognised qualification.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
