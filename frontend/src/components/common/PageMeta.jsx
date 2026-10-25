import { useEffect } from "react";
import { BRAND_NAME } from "../../data/constants";
import { absoluteUrl } from "../../data/siteConfig";

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

/**
 * Per-page metadata: title, description, canonical URL and Open Graph tags.
 * Pass `canonicalPath` when a page is reachable at more than one route so only
 * the preferred URL is declared canonical.
 */
export default function PageMeta({ title, description, canonicalPath }) {
  useEffect(() => {
    const pageTitle = title ? `${title} · ${BRAND_NAME}` : BRAND_NAME;
    document.title = pageTitle;

    const path = canonicalPath || window.location.pathname + window.location.search;
    const canonical = absoluteUrl(path);

    setCanonical(canonical);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:site_name", BRAND_NAME);

    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
    }
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:type", "website");
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", pageTitle);
    if (description) setMeta("name", "twitter:description", description);
  }, [title, description, canonicalPath]);

  return null;
}
