import { Menu } from "./menu.schema";
import { RestaurantModel } from "../restaurant/restaurant.schema";
import { ApolloError } from "apollo-server-errors";

import { createMenuItems } from "../menu-item/utils";

class MenuService {
  async getMenu(user: any): Promise<Menu | undefined> {
    try {
      const restaurant = await RestaurantModel.findOne({ userId: user.id });
      if (!restaurant) {
        throw new ApolloError("Restaurant not found");
      }

      const menu = restaurant.menu;
      return menu;
    } catch (error) {
      throw new ApolloError("Unable to get menu. Please try again later.");
    }
  }

  async getRestaurantMenu(restaurantName: any): Promise<Menu | undefined> {
    try {
      const restaurant = await RestaurantModel.findOne({ name: restaurantName });

      if (!restaurant) {
        throw new ApolloError("Restaurant not found");
      }

      const menu = restaurant.menu;
      return menu;
    } catch (error) {
      throw new ApolloError("Unable to get menu. Please try again later.");
    }
  }
}

export default MenuService;
