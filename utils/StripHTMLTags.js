
export const StripHtmlTags = (text) =>{
    if (!text) return "";
    return text.replace(/(<([^>]+)>)/gi, "").trim();
}
