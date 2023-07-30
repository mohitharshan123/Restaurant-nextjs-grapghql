import { Request, Response } from "express";
import { User } from "../schema/user.schema";

interface Context {
  req: Request;
  res: Response;
  user: User | null;
  setCookies: Array<{
    name: string;
    value: string;
    options: {
      maxAge: number;
      httpOnly: boolean;
      domain: string;
      path: string;
      sameSite: string;
      secure: boolean;
    };
  }>;
}

export default Context;
