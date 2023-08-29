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

@ObjectType()
@queryMethod(findByRestaurant)
export class Order {
    @Field(() => Restaurant)
    @prop({ required: false })
    restaurant: Restaurant;

    @Field({ nullable: true })
    @prop({ required: false })
    table?: string;

    @Field(() => GraphQLJSON, { nullable: true })
    @prop({ type: Object, required: false })
    items?: Record<string, number>[];
}

export const OrderModel = getModelForClass<
    typeof Order,
    QueryHelpers
>(Order);

@InputType()
export class CreateOrderInput {
    @Field(() => String)
    restaurantName: string;

    @Field(() => String)
    table: string;

    @Field({ nullable: true })
    items: Record<string, number>[];
}
