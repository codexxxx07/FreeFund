import { useEffect } from "react";
import { BRAND_NAME } from "../../data/constants";

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export default function PageMeta({ title, description }) {
  useEffect(() => {
    const pageTitle = title ? `${title} · ${BRAND_NAME}` : BRAND_NAME;
    document.title = pageTitle;
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
    }
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:type", "website");
  }, [title, description]);

  return null;
}
