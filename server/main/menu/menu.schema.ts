import { getModelForClass, prop } from "@typegoose/typegoose";
import { Category } from "main/category/category.schema";
import { ObjectType, Field, Float, InputType } from "type-graphql";

@ObjectType()
export class Menu {
  @Field(() => [Category])
  @prop({ required: false })
  categories: Category[];
}

export const MenuModel = getModelForClass(Menu);

@InputType()
export class GetMenuInput {
  @Field(() => String)
  restaurantId: string;
}
