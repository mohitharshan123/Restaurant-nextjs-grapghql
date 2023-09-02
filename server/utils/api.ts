import { GraphQLClient } from "graphql-request";
import { getSdk } from "../generated/graphql";

const url = `${process.env.NEXT_PUBLIC_DINE_URL}/api/graphql`

const gqlClient = new GraphQLClient(url);

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
  updateFloorPlan,
  getRestaurantMenu,
  updateSettings,
  getSettings,
  createOrder,
  getOrders,
  getPayments
} = getSdk(gqlClient);

