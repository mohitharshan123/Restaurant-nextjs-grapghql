import { ApolloError } from "apollo-server-errors";
import {
  CreateRestaurantInput,
  RestaurantModel,
} from "main/restaurant/restaurant.schema";

class RestaurantService {
  async createRestaurant(input: CreateRestaurantInput) {
    return RestaurantModel.create(input);
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
    } catch (error) {
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
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}

export default RestaurantService;
