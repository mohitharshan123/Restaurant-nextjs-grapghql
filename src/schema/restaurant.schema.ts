import {
  getModelForClass,
  prop,
  ReturnModelType,
  queryMethod,
  index,
} from "@typegoose/typegoose";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import { Field, InputType, ObjectType } from "type-graphql";

import { Menu } from "./menu.schema";

function findByName(
  this: ReturnModelType<typeof Restaurant, QueryHelpers>,
  name: Restaurant["name"]
) {
  return this.findOne({ name });
}

interface QueryHelpers {
  findByName: AsQueryMethod<typeof findByName>;
}

@queryMethod(findByName)
@index({ name: 1 })
@ObjectType()
export class Restaurant {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true })
  email: string;

  @Field(() => String)
  @prop({ required: true })
  location: string;

  @Field(() => String)
  @prop({ required: true })
  contact: string;

  @Field({ nullable: true })
  @prop({ required: false })
  menu: Menu;
}

export const RestaurantModel = getModelForClass<
  typeof Restaurant,
  QueryHelpers
>(Restaurant);

@InputType()
export class CreateRestaurantInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  location: string;

  @Field(() => String)
  contact: string;
}

@InputType()
export class GetRestaurantInput {
  @Field(() => String)
  restaurantId: string;
}
