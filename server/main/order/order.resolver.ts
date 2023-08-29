import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { CreateOrderInput, Order } from "./order.schema";
import OrderService from "./order.service";

@Resolver()
export default class OrderResolver {
    constructor(private orderService: OrderService) {
        this.orderService = new OrderService();
    }

    @Mutation(() => Order)
    createOrder(@Arg("input") input: CreateOrderInput) {
        return this.orderService.createOrder(input);
    }

    @Query(() => [Order])
    getRestaurantOrders(@Arg("restaurantName") restaurantName: string) {
        return this.orderService.getRestaurantOrders(restaurantName);
    }
}
