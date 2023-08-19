import { getModelForClass, prop } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";
import { Category } from "../category/category.schema";

@ObjectType()
export class MenuItem {
  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => Category)
  @prop({ required: false })
  category: Category;

  @Field(() => String)
  @prop({ required: true })
  description: string;

  @Field(() => String)
  @prop({ required: true })
  price: number;

  @Field(() => String)
  @prop({ required: true })
  imageID: string;
}

export const MenuItemModel = getModelForClass(MenuItem);
