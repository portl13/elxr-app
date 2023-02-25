import React from "react";

import { onError } from "@apollo/client/link/error";
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

const ApolloWrapper = ({ children }) => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const httpLink = from([
    errorLink,
    new HttpLink({
      uri: "https://production.suggestic.com/graphql",
    }),
  ]);

  const authLink = setContext((_, { headers }) => {
    if (headers?.Authorization) {
      return { headers: { ...headers } };
    }
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${Cookies.get("suggesticToken") || null}`,
      },
    };
  });

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
