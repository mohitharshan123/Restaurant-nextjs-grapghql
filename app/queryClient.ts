
import { QueryClient } from "react-query";


export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    },
});

export const QUERY_KEYS = {
    restaurants: "restaurants",
    currentUser: "current-user",
    myRestaurant: "my-restaurant",
    menu: "menu",
    restaurantMenu: "restaurant-menu",
    settings: "settings"
};