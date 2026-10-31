/**
 * PeopleRow — cut-out silhouette row used above the footer bar. Decorative
 * only: no real people, no external images. One figure is lime for contrast.
 */
const PEOPLE = [
  { height: 132, hair: "bun", lime: false },
  { height: 158, hair: "crop", lime: true },
  { height: 120, hair: "short", lime: false },
  { height: 146, hair: "long", lime: false },
  { height: 112, hair: "cap", lime: false },
  { height: 150, hair: "bun", lime: false },
];

function Figure({ person, index }) {
  const bodyFill = person.lime ? "ed-people__body ed-people__body--lime" : "ed-people__body";
  return (
    <svg viewBox="0 0 100 170" role="presentation" aria-hidden="true" focusable="false">
      <g>
        {/* shoulders */}
        <path className={bodyFill} d="M4 170c0-35 20-58 46-58s46 23 46 58z" />
        {/* neck */}
        <rect className={bodyFill} x="42" y="80" width="16" height="34" />
        {/* head */}
        <circle className={bodyFill} cx="50" cy="54" r="27" />
        {person.hair === "bun" ? <circle className={bodyFill} cx="50" cy="22" r="11" /> : null}
        {person.hair === "long" ? (
          <path className={bodyFill} d="M23 52c0-24 12-38 27-38s27 14 27 38v28c-6 4-10-6-12-16H35c-2 10-6 20-12 16z" />
        ) : null}
        {person.hair === "cap" ? (
          <>
            <path className={bodyFill} d="M20 48c0-18 13-30 30-30s30 12 30 30z" />
            <rect className={bodyFill} x="16" y="46" width="66" height="7" rx="3.5" />
          </>
        ) : null}
        {/* collar / cut-out detail */}
        <path className="ed-people__line" d="M36 112c4 10 9 16 14 16s10-6 14-16" />
        {index % 2 === 0 ? (
          <path className="ed-people__line" d="M50 124v30" />
        ) : (
          <path className="ed-people__line" d="M36 126l14 28 14-28" />
        )}
      </g>
    </svg>
  );
}

export default function PeopleRow() {
  return (
    <div className="ed-footer__people" aria-hidden="true">
      {PEOPLE.map((person, index) => (
        <div key={index} style={{ transform: `translateY(${Math.round(person.height % 7)}px)` }}>
          <Figure person={person} index={index} />
        </div>
      ))}
    </div>
  );
}
