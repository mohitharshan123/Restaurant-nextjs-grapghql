import { ApolloError } from "apollo-server-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CreateUserInput, LoginInput, UserModel } from "@/schema/user.schema";

import Context from "../types/context";
import { signJwt } from "../utils/jwt";

class UserService {
  async createUser(input: CreateUserInput) {
    return UserModel.create(input);
  }

  async login(input: LoginInput, context: Context) {
    const e = "Invalid email or password";

    // Get our user by email
    const user = await UserModel.find().findByEmail(input.email).lean();

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
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      },
    });

    return token;
  }

  async getUserIdFromToken(token: string) {
    try {
      const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
      const user = UserModel.findOne({ id: decodedToken.id });
      return user;
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}

export default UserService;
