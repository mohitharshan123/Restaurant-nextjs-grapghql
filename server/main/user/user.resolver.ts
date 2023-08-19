import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  Authorized,
  ObjectType,
  Field,
} from "type-graphql";
import { CreateUserInput, LoginInput, User } from "main/user/user.schema";
import UserService from "main/user/user.service";
import RestaurantService from "main/restaurant/restaurant.service";
import { Restaurant } from "main/restaurant/restaurant.schema";

@ObjectType()
class CreateUserMutationResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Restaurant, { nullable: true })
  restaurant?: Restaurant;
}

@Resolver()
export default class UserResolver {
  constructor(
    private userService: UserService,
    private restaurantService: RestaurantService,
  ) {
    this.userService = new UserService();
    this.restaurantService = new RestaurantService();
  }

  @Mutation(() => CreateUserMutationResponse)
  createUser(@Arg("input") input: CreateUserInput) {
    return this.userService.createUserAndLinkRestaurant(input);
  }

  @Mutation(() => String)
  login(@Arg("input") input: LoginInput, @Ctx() context: any) {
    return this.userService.login(input, context);
  }

  @Query(() => User, { nullable: true })
  @Authorized()
  me(@Ctx() context: any) {
    return context.user;
  }

  @Query(() => Restaurant, { nullable: true })
  @Authorized()
  myRestaurant(@Ctx() context: any) {
    return this.restaurantService.getUserRestaurant(context.user.id);
  }
}
