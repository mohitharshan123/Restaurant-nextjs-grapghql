import { CreateUserInput, Exact, LoginInput } from "generated/graphql";
import { useMutation, useQuery } from "react-query";

import {
  createUser,
  currentUser,
  login,
  QUERY_KEYS,
} from "../../../src/utils/api";

export type CreateUserPayload = {
  restaurantName: string;
  email: string;
  password: string;
};

export const useCreateUser = () =>
  useMutation((payload: Exact<{ input: CreateUserInput }>) =>
    createUser(payload)
  );

export const useLogin = () =>
  useMutation((payload: Exact<{ input: LoginInput }>) => login(payload));

export const useCurrentUser = () =>
  useQuery([QUERY_KEYS.currentUser], () => currentUser(), { retry: false });
