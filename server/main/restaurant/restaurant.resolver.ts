import { Arg, Ctx, Mutation, Query, Resolver, Authorized, FieldResolver, Root } from "type-graphql";
import {
  CreateRestaurantInput,
  Restaurant,
} from "main/restaurant/restaurant.schema";
import { Notification, NotificationModel } from "main/notification/notification.schema";
import RestaurantService from "main/restaurant/restaurant.service";
import GraphQLJSON from "graphql-type-json";

@Resolver(() => Restaurant)
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

  @Mutation(() => Restaurant)
  @Authorized()
  updateFloorPlan(@Arg("newFloorPlan", () => GraphQLJSON) newFloorPlan: Record<string, number[]>, @Ctx() context: any) {
    return this.restaurantService.updateFloorPlan(context.user.id, newFloorPlan);
  }

  @FieldResolver(() => [Notification])
  async notifications(@Root() restaurant: any): Promise<Notification[]> {
    const notifications = await NotificationModel.find({ "restaurant._id": restaurant._doc._id }).sort({ createdAt: -1 });
    return notifications;
  }
}
