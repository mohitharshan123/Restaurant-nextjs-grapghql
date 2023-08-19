import { getModelForClass, prop } from "@typegoose/typegoose";
import { ObjectType, Field, Float, InputType } from "type-graphql";
import { MenuItem } from "../menu-item/menu-item.schema";
import { Restaurant } from "../restaurant/restaurant.schema";

@ObjectType()
export class Menu {
  @Field(() => [MenuItem])
  @prop({ required: false })
  items: MenuItem[];
}

@InputType()
export class CreateMenuInput {
  @Field()
  restaurantId: string;

  @Field(() => [MenuItemInput])
  items: MenuItemInput[];
}

export const MenuModel = getModelForClass(Menu);

@InputType()
class MenuItemInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field()
  imageID: string;
}

@InputType()
export class GetMenuInput {
  @Field(() => String)
  restaurantId: string;
}
