import jwt from "jsonwebtoken";
import { User } from "../user/user.schema";

export const signJwt = (user: User): string => {
  const secretKey = process.env.PRIVATE_KEY;
  const expiresIn = "1h";
  const token = jwt.sign({ id: user._id, email: user.email }, secretKey, {
    expiresIn,
  });

  return token;
};
