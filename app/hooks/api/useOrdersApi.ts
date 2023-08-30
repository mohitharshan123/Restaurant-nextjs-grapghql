import { CreateOrderInput, Exact } from "generated/graphql";
import { useMutation, useQuery } from "react-query";
//@ts-ignore
import { prop } from "ramda";

import { createOrder, getOrders } from "../../../server/utils/api";
import { queryClient, QUERY_KEYS } from "../../queryClient";

export const useFetchOrders = () =>
    useQuery([QUERY_KEYS.orders], () => getOrders(), {
        select: prop("getOrders"),
        refetchInterval: 2000
    });


export const useCreateOrder = () =>
    useMutation((payload: Exact<{ input: CreateOrderInput }>) => createOrder(payload),
        { onSuccess: () => queryClient.invalidateQueries([QUERY_KEYS.menu]) })