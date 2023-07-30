import {
  Menu,
  CreateMenuInput,
  GetMenuInput,
  MenuModel,
} from "menu/menu.schema";
import { RestaurantModel } from "restaurant/restaurant.schema";
import { ApolloError } from "apollo-server-errors";

import { createMenuItems } from "../menu-item/utils";

class MenuService {
  async createMenu(input: CreateMenuInput): Promise<Menu> {
    try {
      const restaurant = await RestaurantModel.findById(input.restaurantId);
      if (!restaurant) {
        throw new ApolloError("Restaurant not found.");
      }

      const menu = new MenuModel();
      menu.items = createMenuItems(menu, input.items);
      menu.save();
      restaurant.menu = menu;

      await restaurant.save();

      return menu;
    } catch (error) {
      throw new ApolloError("Unable to create menu. Please try again later.");
    }
  }

  async getMenu(input: GetMenuInput): Promise<Menu | null> {
    try {
      const restaurant = await RestaurantModel.findById(input.restaurantId);
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
