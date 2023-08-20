import { CreateCategoryInput, Exact } from "generated/graphql";
import { useMutation } from "react-query";

import { createCategory } from "../../../server/utils/api";
import { queryClient, QUERY_KEYS } from "../../queryClient";

export const useCreateCategory = () =>
    useMutation((payload: Exact<{ input: CreateCategoryInput }>) => createCategory(payload),
        { onSuccess: () => queryClient.invalidateQueries([QUERY_KEYS.menu]) })