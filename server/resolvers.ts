import UserResolver from "./main/user/user.resolver";
import RestaurantResolver from "./main/restaurant/restaurant.resolver";
import MenuResolver from "./main/menu/menu.resolver";
import CategoryResolver from "./main/category/category.resolver";
import MenuItemResolver from "main/menu-item/menu-item.resolver";

export const resolvers = [
  UserResolver,
  RestaurantResolver,
  MenuResolver,
  CategoryResolver,
  MenuItemResolver
] as const;
