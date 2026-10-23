import { useEffect } from "react";
import { BRAND_NAME } from "../../data/constants";

export default function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} · ${BRAND_NAME}` : BRAND_NAME;
    if (description) {
      const existing = document.querySelector('meta[name="description"]');
      if (existing) existing.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
}
