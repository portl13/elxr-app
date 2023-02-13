import React from "react";

import Card from "@/elxr/components/bits/Card";
import QuoteIcon from "@/public/img/icons/quote.svg";

import SpinnerLoader from "@/components/shared/loader/SpinnerLoader";

import { useQuote } from "@/elxr/hooks/api/quote";

import {
  cardCSS,
  iconCSS,
  NoResults,
  CardContents,
  Title,
  QuoteContainer,
  Quote,
  Author,
} from "./styles";

const QuoteOfTheDayWidget = () => {
  const { data: quote = { text: "", author: "" }, isValidating: loading } =
    useQuote();

  return (
    <Card css={cardCSS}>
      <QuoteIcon css={iconCSS} />
      {loading && <SpinnerLoader />}

      {!loading && !quote?.text && <NoResults>No quotes available</NoResults>}

      {!loading && quote?.text && (
        <CardContents>
          <Title>Quote of the day:</Title>
          <QuoteContainer>
            <Quote>{quote.text}</Quote>
            <Author>— {quote.author}</Author>
          </QuoteContainer>
        </CardContents>
      )}
    </Card>
  );
};

export default QuoteOfTheDayWidget;
