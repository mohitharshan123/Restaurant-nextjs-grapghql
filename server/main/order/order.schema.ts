import {
    getModelForClass,
    prop,
    mongoose,
} from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import GraphQLJSON from 'graphql-type-json';
import { Restaurant } from "main/restaurant/restaurant.schema";

@ObjectType()
export class OrderItem {
    @Field(() => String)
    id: string;

    @Field(() => String)
    name?: string;

    @Field(() => Number)
    quantity: string;
}

@ObjectType()
export class Order {
    @Field()
    @prop({ required: false })
    restaurant: Restaurant;

    @Field(() => String)
    @prop({ required: true })
    table: string;

    @Field(() => String)
    @prop({ required: true })
    floor: string;

    @Field(() => [OrderItem], { nullable: true })
    @prop({ type: Object, required: false })
    items: OrderItem[];

    @Field(() => String)
    @prop({ required: true })
    status: "pending" | "delivered" | "cancelled";

    @Field(() => String)
    @prop({ required: true })
    razorpayPaymentId: string;

    @Field(() => String)
    @prop({ required: true })
    razorpayOrderId: string;

    @Field(() => String)
    @prop({ required: true })
    razorpaySignature: string;
}



@InputType()
export class CreateOrderInput {
    @Field(() => String)
    restaurantName: string;

    @Field(() => String)
    table: string;

    @Field(() => String)
    floor: string;

    @Field(() => GraphQLJSON, { nullable: true })
    items?: OrderItem[];

    @Field(() => String)
    status: "pending" | "delivered" | "cancelled";

    @Field(() => String)
    razorpayPaymentId: string;

    @Field(() => String)
    razorpayOrderId: string;

    @Field(() => String)
    razorpaySignature: string;
}

export const OrderModel = mongoose.models.Order || getModelForClass(Order, { schemaOptions: { timestamps: true } });