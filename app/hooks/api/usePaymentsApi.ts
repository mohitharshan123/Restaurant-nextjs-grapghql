import { CreateOrderInput, Exact } from "generated/graphql";
import { useMutation, useQuery } from "react-query";
//@ts-ignore
import { prop } from "ramda";

import { getPayments } from "../../../server/utils/api";
import { queryClient, QUERY_KEYS } from "../../queryClient";

export const useFetchPayments = () =>
    useQuery([QUERY_KEYS.payments], () => getPayments(), {
        select: prop("getPayments")
    });
