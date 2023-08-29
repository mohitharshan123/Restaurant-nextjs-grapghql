import UserResolver from "main/user/user.resolver";
import RestaurantResolver from "main/restaurant/restaurant.resolver";
import MenuResolver from "main/menu/menu.resolver";
import CategoryResolver from "main/category/category.resolver";
import MenuItemResolver from "main/menu-item/menu-item.resolver";
import SettingsResolver from "main/settings/settings.resolver";
import OrderResolver from "main/order/order.resolver";

export const resolvers = [
  UserResolver,
  RestaurantResolver,
  MenuResolver,
  CategoryResolver,
  MenuItemResolver,
  SettingsResolver,
  OrderResolver,
] as const;
