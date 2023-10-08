import { ApolloError } from "apollo-server-errors";
import { MenuModel } from "main/menu/menu.schema";
import {
  CreateRestaurantInput,
  RestaurantModel,
} from "main/restaurant/restaurant.schema";

class RestaurantService {
  async createRestaurant(input: CreateRestaurantInput) {
    try {
      const restaurant = await RestaurantModel.create(input);
      const menu = await MenuModel.create({ categories: [] })
      restaurant.menu = menu;
      restaurant.save()

      return restaurant;
    }
    catch (error) {
      throw new ApolloError(
        "Unable to create restaurant. Please try again later.",
      );
    }
  }

  async getRestaurants() {
    try {
      const restaurants = await RestaurantModel.find();
      return restaurants;
    } catch (error) {
      // Handle any errors that occur during the database query
      throw new ApolloError(
        "Unable to fetch restaurants. Please try again later.",
      );
    }
  }
  async getRestaurant(_id: string) {
    try {
      const restaurant = await RestaurantModel.findOne({
        _id,
      });
      if (!restaurant) {
        throw new ApolloError("Restaurant not found");
      }
      return restaurant;
    } catch (error: any) {
      throw new ApolloError(error);
    }
  }

  async getUserRestaurant(_id: string) {
    try {
      const restaurant = await RestaurantModel.findOne({
        userID: _id,
      });
      if (!restaurant) {
        throw new ApolloError("Restaurant not found");
      }
      return restaurant;
    } catch (error: any) {
      throw new ApolloError(error);
    }
  }

  async updateFloorPlan(userID: string, newFloorPlan: Record<string, number[]>) {
    try {
      const restaurant = await RestaurantModel.findOneAndUpdate(
        { userID },
        { floorPlan: newFloorPlan },
        { new: true }
      );

      if (!restaurant) {
        throw new ApolloError('Restaurant not found');
      }
      return restaurant;
    } catch (error: any) {
      throw new ApolloError(error);
    }
  }
}

export default RestaurantService;
