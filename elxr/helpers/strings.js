export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const padWithZeros = (str, length) => {
  return str?.toString().padStart(length, "0");
};
