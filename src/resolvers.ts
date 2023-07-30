import UserResolver from "./user/user.resolver";
import RestaurantResolver from "./restaurant/restaurant.resolver";
import MenuResolver from "./menu/menu.resolver";

export const resolvers = [
  UserResolver,
  RestaurantResolver,
  MenuResolver,
] as const;
