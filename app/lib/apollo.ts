"use client";

import { ApolloClient } from "@apollo/client/core";
import { InMemoryCache } from "@apollo/client/cache";
import { HttpLink } from "@apollo/client/link/http";

const httpLink = new HttpLink({
	uri: "/api/graphql",
});

export const apolloClient = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
	defaultOptions: {
		query: {
			fetchPolicy: "network-only",
		},
	},
});
