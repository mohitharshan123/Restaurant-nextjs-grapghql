import UserResolver from "./main/user/user.resolver";
import RestaurantResolver from "./main/restaurant/restaurant.resolver";
import MenuResolver from "./main/menu/menu.resolver";
import CategoryResolver from "./main/category/category.resolver";

export const resolvers = [
  UserResolver,
  RestaurantResolver,
  MenuResolver,
  CategoryResolver
] as const;
