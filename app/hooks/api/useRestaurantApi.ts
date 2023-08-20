import { useQuery } from "react-query";
import { prop } from "ramda";

import { QUERY_KEYS } from "../../queryClient";

import { getMenu, myRestaurant } from "../../../server/utils/api";


export const useMyRestaurant = () =>
  useQuery([QUERY_KEYS.myRestaurant], () => myRestaurant(), {
    select: prop("myRestaurant"),
  });

export const useGetMenu = () => useQuery([QUERY_KEYS.menu], () => getMenu(), {
  select: prop("menu"),
});