import sanitizeHtml from "sanitize-html";

export const clean = (dirty) => {
    return sanitizeHtml(dirty, {
        allowedTags: ["b", "i", "em"],
    });
};
