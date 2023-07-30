import { Arg, Ctx, Mutation, Query, Resolver, Authorized } from "type-graphql";
import {
  CreateRestaurantInput,
  GetRestaurantInput,
  Restaurant,
} from "@/schema/restaurant.schema";
import RestaurantService from "@/services/restaurant.service";

@Resolver()
export default class RestaurantResolver {
  constructor(private restaurantService: RestaurantService) {
    this.restaurantService = new RestaurantService();
  }

  @Mutation(() => Restaurant)
  @Authorized()
  createRestaurant(@Arg("input") input: CreateRestaurantInput) {
    return this.restaurantService.createRestaurant(input);
  }

  @Query(() => Restaurant, { nullable: true })
  @Authorized()
  restaurant(@Arg("id", () => String) id: string) {
    return this.restaurantService.getRestaurant(id);
  }

  @Query(() => [Restaurant])
  @Authorized()
  restaurants() {
    return this.restaurantService.getRestaurants();
  }
}
