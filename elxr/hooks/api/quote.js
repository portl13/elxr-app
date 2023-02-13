import { useFakeRequest } from "@/elxr/mocks/helpers";
import { quote } from "@/elxr/mocks/data";

export const useQuote = () => {
  return useFakeRequest(quote, {
    // Use the delay or error options if necessary
  });
};
