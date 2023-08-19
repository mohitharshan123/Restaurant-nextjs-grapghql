import { CreateCategoryInput, Exact } from "generated/graphql";
import { useMutation } from "react-query";

import { createCategory } from "../../../server/utils/api";

export const useCreateCategory = () =>
    useMutation((payload: Exact<{ input: CreateCategoryInput }>) => createCategory(payload))