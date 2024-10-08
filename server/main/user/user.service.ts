import { ApolloError } from "apollo-server-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { CreateUserInput, LoginInput, UserModel } from "main/user/user.schema";

import { signJwt } from "../../utils/jwt";
import { RestaurantModel } from "main/restaurant/restaurant.schema";
import { MenuModel } from "main/menu/menu.schema";
import { Context } from "../../types";

class UserService {
  async createUser(input: CreateUserInput) {
    return UserModel.create(input);
  }

  async createUserAndLinkRestaurant(input: CreateUserInput) {
    const session = await mongoose.startSession();
    try {
      await session.startTransaction();

      const existingUser = await UserModel.findOne({ email: input.email });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const user = await UserModel.create({
        email: input.email,
        password: input.password,
      });

      const restaurantData = {
        name: input.restaurantName,
        userId: user._id,
      };
      const restaurant = await RestaurantModel.create(restaurantData);
      const menu = await MenuModel.create({ categories: [] });
      restaurant.menu = menu;
      restaurant.save()
      return { user, restaurant };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async login(input: LoginInput, context: Context) {
    const e = "Invalid email or password";

    // Get our user by email
    const user = await UserModel.findOne({ email: input.email }).lean();

    if (!user) {
      throw new ApolloError(e);
    }

    // validate the password
    const passwordIsValid = await bcrypt.compare(input.password, user.password);

    if (!passwordIsValid) {
      throw new ApolloError(e);
    }

    // sign a jwt
    const token = signJwt(user);

    context.setCookies.push({
      name: "accessToken",
      value: token,
      options: {
        maxAge: 3.154e10,
        domain: process.env.DOMAIN,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      },
    });

    return token;
  }

  async getUserIdFromToken(token: string) {
    try {
      const decodedToken: any = jwt.verify(token, process.env.PRIVATE_KEY ?? "");
      const user = UserModel.findOne({ id: decodedToken.id });
      return user;
    } catch (error: any) {
      throw new ApolloError(error);
    }
  }
}

export default UserService;
