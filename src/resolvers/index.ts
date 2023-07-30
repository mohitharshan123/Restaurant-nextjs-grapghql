import UserResolver from "./user.resolver";
import RestaurantResolver from "./restaurant.resolver";
import MenuResolver from "./menu.resolver";

export const resolvers = [
  UserResolver,
  RestaurantResolver,
  MenuResolver,
] as const;
