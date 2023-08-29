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
            const newOrder = await OrderModel.create({ restaurant, table: input.table, items: input.items, status: input.status })
            return newOrder;
        } catch (error) {
            throw new ApolloError(
                "Unable to create order. Please try again later.",
            );
        }

    }
    async getRestaurantOrders(restaurantName: String) {
        try {
            const orders = OrderModel.find({ "restaurant.name": restaurantName })
            return orders;
        } catch (error) {
            throw new ApolloError(
                "Unable to fetch orders. Please try again later.",
            );
        }
    }
}

export default OrderService;
