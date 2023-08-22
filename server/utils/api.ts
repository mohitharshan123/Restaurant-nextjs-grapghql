import { GraphQLClient } from "graphql-request";
import { getSdk } from "../generated/graphql";

const gqlClient = new GraphQLClient("http://localhost:3000/api/graphql");

export const {
  getRestaurants,
  getRestaurant,
  createUser,
  login,
  currentUser,
  myRestaurant,
  createCategory,
  getMenu,
  createMenuItem,
  updateFloorPlan
} = getSdk(gqlClient);

