import { GraphQLClient } from "graphql-request";
import { QueryClient } from "react-query";

import { getSdk } from "../generated/graphql";

const gqlClient = new GraphQLClient("http://localhost:3000/api/graphql");

export const {
  getRestaurants,
  getRestaurant,
  createUser,
  login,
  currentUser,
  myRestaurant,
} = getSdk(gqlClient);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export const QUERY_KEYS = {
  restaurants: "restaurants",
  currentUser: "current-user",
  myRestaurant: "my-restaurant",
};
