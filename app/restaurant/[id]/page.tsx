"use client";

import { useShowRestaurant } from "../../hooks/api/useRestaurantApi";

const Restaurant: React.FunctionComponent<{
  params: { id: string };
}> = ({ params: { id } }) => {
  const { data: restaurant } = useShowRestaurant(id);
  console.log(restaurant);
  if (!restaurant) return null;
  return (
    <div>
      <p className="text-lg text-red-500">{restaurant.name}</p>
      <p>{restaurant.contact}</p>
      <p>{restaurant.location}</p>
      <p>{restaurant.name}</p>
    </div>
  );
};

export default Restaurant;
