import { HiInformationCircle } from "react-icons/hi2";
import { DEMO_NOTICE } from "../../data/constants";

export default function DemoNotice({ compact = false }) {
  return (
    <div className={`demo-notice ${compact ? "demo-notice-compact" : ""}`}>
      <HiInformationCircle size={compact ? 16 : 18} aria-hidden="true" />
      <p>{DEMO_NOTICE}</p>
    </div>
  );
}
