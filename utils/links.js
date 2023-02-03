import { stringToSlug } from "@lib/stringToSlug";

export const profileLink = (name, id) => {
  return `/profile/${stringToSlug(name)}/${id}`;
};

export const writingsLink = (name, id) => {
  return `/writing/${stringToSlug(name)}/${id}`;
};
