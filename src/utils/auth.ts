import { ResolverData } from "type-graphql";
import UserService from "../services/user.service";
import { AuthChecker } from "type-graphql";
import Context from "@/types/context";

export const customAuthChecker: AuthChecker<Context> = (
  { root, args, context, info },
  roles
) => {
  if (!context.user) return false;
  return true;
};
