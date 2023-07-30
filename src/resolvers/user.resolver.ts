import { Arg, Ctx, Mutation, Query, Resolver, Authorized } from "type-graphql";
import { CreateUserInput, LoginInput, User } from "@/schema/user.schema";
import UserService from "@/services/user.service";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  createUser(@Arg("input") input: CreateUserInput) {
    return this.userService.createUser(input);
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
}
