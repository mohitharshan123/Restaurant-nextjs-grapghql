import { useMutation, useQuery } from "react-query";


import { QUERY_KEYS } from "../../queryClient";

import {
  createUser,
  currentUser,
  login,
} from "../../../server/utils/api";
import { CreateUserInput, Exact, LoginInput } from "../../../server/generated/graphql";


export type CreateUserPayload = {
  restaurantName: string;
  email: string;
  password: string;
};

export const useCreateUser = () =>
  useMutation((payload: Exact<{ input: CreateUserInput }>) =>
    createUser(payload),
  );

export const useLogin = () =>
  useMutation((payload: Exact<{ input: LoginInput }>) => login(payload));

export const useCurrentUser = () =>
  useQuery([QUERY_KEYS.currentUser], () => currentUser(), { retry: false });
