import {
    getModelForClass,
    prop,
    ReturnModelType,
    queryMethod,
    mongoose,
} from "@typegoose/typegoose";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import { Field, InputType, ObjectType } from "type-graphql";
import GraphQLJSON from 'graphql-type-json';
import { Restaurant } from "main/restaurant/restaurant.schema";


function findByRestaurant(
    this: ReturnModelType<typeof Order, QueryHelpers>,
    restaurantName: string,
) {
    return this.find({ "restaurant.name": restaurantName });
}

interface QueryHelpers {
    findByRestaurant: AsQueryMethod<typeof findByRestaurant>;
}

@queryMethod(findByRestaurant)
@ObjectType()
export class Order {
    @Field()
    @prop({ required: false })
    restaurant: Restaurant;

    @Field(() => String)
    @prop({ required: true })
    table: string;

    @Field(() => GraphQLJSON, { nullable: true })
    @prop({ type: Object, required: false })
    items: Record<string, number>;

    @Field(() => String)
    @prop({ required: true })
    status: "pending" | "delivered" | "cancelled";
}


@InputType()
export class CreateOrderInput {
    @Field(() => String)
    restaurantName: string;

    @Field(() => String)
    table: string;

    @Field(() => GraphQLJSON, { nullable: true })
    items?: Record<string, number>;
}

export const OrderModel = mongoose.models.Order || getModelForClass<
    typeof Order,
    QueryHelpers
>(Order);