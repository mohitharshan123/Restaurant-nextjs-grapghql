import { createMenuItem } from "@/utils/api";
import { CreateMenuItemInput, Exact } from "generated/graphql";
import { useMutation } from "react-query";
import { queryClient, QUERY_KEYS } from "../../queryClient";

export const useCreateMenuItem = () =>
    useMutation((payload: Exact<{ input: CreateMenuItemInput }>) => createMenuItem(payload),
        { onSuccess: () => queryClient.invalidateQueries([QUERY_KEYS.menu]) })