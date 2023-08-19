import { useQuery } from "react-query";
import { myRestaurant, QUERY_KEYS } from "../../../server/utils/api";
import { prop } from "ramda";

export const useMyRestaurant = () =>
  useQuery([QUERY_KEYS.myRestaurant], () => myRestaurant(), {
    select: prop("myRestaurant"),
  });
