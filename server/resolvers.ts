import UserResolver from "main/user/user.resolver";
import RestaurantResolver from "main/restaurant/restaurant.resolver";
import MenuResolver from "main/menu/menu.resolver";
import CategoryResolver from "main/category/category.resolver";
import MenuItemResolver from "main/menu-item/menu-item.resolver";
import SettingsResolver from "main/settings/settings.resolver";
import OrderResolver from "main/order/order.resolver";
import PaymentsResolver from "main/payments/payments.resolver";

export const resolvers = [
  RestaurantResolver,
  UserResolver,
  MenuResolver,
  CategoryResolver,
  MenuItemResolver,
  SettingsResolver,
  OrderResolver,
  PaymentsResolver,
] as const;
