import { useFakeRequest } from "@/elxr/mocks/helpers";
import { recipes } from "@/elxr/mocks/data";

export const useRecipes = () => {
  return useFakeRequest(recipes, {
    // Use the delay or error options if necessary
  });
};
