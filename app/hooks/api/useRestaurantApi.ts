import { useMutation, useQuery } from "react-query";
import { prop } from "ramda";

import { queryClient, QUERY_KEYS } from "../../queryClient";

import { getMenu, getRestaurantMenu, myRestaurant, updateFloorPlan } from "../../../server/utils/api";
import { Exact } from "generated/graphql";


export const useMyRestaurant = () =>
  useQuery([QUERY_KEYS.myRestaurant], () => myRestaurant(), {
    select: prop("myRestaurant"),
  });

export const useGetMenu = () => useQuery([QUERY_KEYS.menu], () => getMenu(), {
  select: prop("menu"),
});

export const useGetRestaurantMenu = (restaurantName: string) =>
  useQuery([QUERY_KEYS.restaurantMenu, restaurantName],
    () => getRestaurantMenu({ restaurantName }), {
    select: prop("getRestaurantMenu"),
  });

export const useUpdateFloorPlan = () =>
  useMutation((newFloorPlan: Exact<{ newFloorPlan: any; }>) => updateFloorPlan(newFloorPlan),
    { onSuccess: () => queryClient.invalidateQueries([QUERY_KEYS.myRestaurant]) })