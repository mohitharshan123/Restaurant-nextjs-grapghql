import { getModelForClass, prop } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class MenuItem {
  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true })
  description: string;

  @Field(() => String)
  @prop({ required: true })
  price: number;

  @Field(() => String)
  @prop({ required: true })
  imageUrl: string;
}

export const MenuItemModel = getModelForClass(MenuItem);
