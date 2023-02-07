import { stringToSlug } from "@lib/stringToSlug";

export const profileLink = (name, id) => {
  if (!name || !id) return "/";
  return `/profile/${stringToSlug(name)}/${id}`;
};

export const writingsLink = (name, id) => {
  if (!name || !id) return "/";
  return `/writing/${stringToSlug(name)}/${id}`;
};
