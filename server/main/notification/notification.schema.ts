import { getModelForClass, mongoose, prop } from "@typegoose/typegoose";
import { Order } from "main/order/order.schema";
import { Restaurant } from "main/restaurant/restaurant.schema";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Notification {
    @Field()
    @prop({ required: false })
    restaurant: Restaurant;
    
    @Field(() => String)
    @prop({ required: true })
    type: "NEW_ORDER" | "ORDER_PREPARED";

    @Field(() => String)
    @prop({ required: true })
    text: string;

    @Field(() => String)
    @prop({ required: false })
    itemID?: string;

    @Field(() => Order)
    @prop({ required: false })
    order?: Order;
}

export const NotificationModel = mongoose.models.Notification || getModelForClass(Notification, { schemaOptions: { timestamps: true } });

@InputType()
export class CreateNotificationInput {
    @Field()
    type: "MEW_ORDER" | "ORDER_PREPARED";

    @Field(() => String)
    text: string;

    @Field(() => String)
    itemId: string;

    @Field(() => Order)
    order: Order;
}


