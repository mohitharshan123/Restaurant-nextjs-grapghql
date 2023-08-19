import { AuthChecker } from "type-graphql";
import Context from "@/types/";

export const customAuthChecker: AuthChecker<Context> = (
  { context },
) => {
  if (!context.user) return false;
  return true;
};
