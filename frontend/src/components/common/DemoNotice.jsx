import { HiInformationCircle } from "react-icons/hi2";
import { DEMO_NOTICE } from "../../data/constants";

export default function DemoNotice({ compact = false }) {
  return (
    <div
      className={`relative flex items-start gap-3 overflow-hidden rounded-2xl border border-color-mix(in_srgb,var(--color-highlight)_60%,white) bg-gradient-to-r from-highlight/25 to-highlight/15 ${
        compact ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm"
      }`}
    >
      <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-highlight/60 text-ink">
        <HiInformationCircle aria-hidden="true" />
      </span>
      <p className="text-ink">{DEMO_NOTICE}</p>
      <span className="skew-decor -right-10 -top-6 h-16 w-16 opacity-60" aria-hidden="true" />
    </div>
  );
}
