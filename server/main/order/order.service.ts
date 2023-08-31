import { ApolloError } from "apollo-server-errors";
import { RestaurantModel } from "main/restaurant/restaurant.schema";
import { CreateOrderInput, OrderModel } from "./order.schema";

class OrderService {
    async createOrder(input: CreateOrderInput) {
        try {
            const restaurant = await RestaurantModel.findOne({ name: input.restaurantName })
            if (!restaurant) {
                throw new ApolloError(
                    "There are no restaurants associated with this name.",
                );
            }
            const newOrder = await OrderModel.create(input)
            return newOrder;
        } catch (error) {
            throw new ApolloError(
                "Unable to create order. Please try again later.",
            );
        }

    }
    async getOrders(user: any) {
        try {
            const restaurant = await RestaurantModel.findOne({ userId: user.id });
            if (!restaurant) {
                throw new ApolloError("Restaurant not found");
            }
            const orders = await OrderModel.find({ "restaurant.name": restaurant.name })
            return orders;
        } catch (error) {
            throw new ApolloError(
                "Unable to fetch orders. Please try again later.",
            );
        }
    }
}

export default OrderService;
