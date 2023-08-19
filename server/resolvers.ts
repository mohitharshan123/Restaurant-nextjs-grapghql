import UserResolver from "./user/user.resolver";
import RestaurantResolver from "./restaurant/restaurant.resolver";
import MenuResolver from "./menu/menu.resolver";
import CategoryResolver from "./category/category.resolver";

export const resolvers = [
  UserResolver,
  RestaurantResolver,
  MenuResolver,
  CategoryResolver
] as const;
