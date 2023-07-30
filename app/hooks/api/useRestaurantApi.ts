import { useQuery } from "react-query";
import { getRestaurant, QUERY_KEYS } from "../../../src/utils/api";

export const useShowRestaurant = (id: string) =>
  useQuery([QUERY_KEYS, id], () => getRestaurant({ id }), {
    select: (data) => data.restaurant,
  });
