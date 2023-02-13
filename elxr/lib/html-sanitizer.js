import { sanitize } from "dompurify";

// Strips html and only leaves text
export const stripHtmlTags = (html) => {
  return sanitize(html, {
    ALLOWED_TAGS: [],
  });
};
