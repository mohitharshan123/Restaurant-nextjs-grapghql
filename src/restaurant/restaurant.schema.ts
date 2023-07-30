import {
  getModelForClass,
  prop,
  ReturnModelType,
  queryMethod,
  index,
} from "@typegoose/typegoose";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import { Field, InputType, ObjectType } from "type-graphql";

import { Menu } from "../menu/menu.schema";

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
@ObjectType()
export class Restaurant {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true, index: true })
  name: string;

  @Field({ nullable: true })
  @prop({ required: false })
  email?: string;

  @Field({ nullable: true })
  @prop({ required: false })
  location?: string;

  @Field({ nullable: true })
  @prop({ required: false })
  contact?: string;

  @Field({ nullable: true })
  @prop({ required: false })
  menu?: Menu;

  @Field({ nullable: true })
  @prop({ required: false })
  userId: string;
}

export const RestaurantModel = getModelForClass<
  typeof Restaurant,
  QueryHelpers
>(Restaurant);

@InputType()
export class CreateRestaurantInput {
  @Field(() => String)
  name: string;

  @Field({ nullable: true })
  location: string;

  @Field({ nullable: true })
  contact: string;

  @Field({ nullable: true })
  userId: string;
}

@InputType()
export class GetRestaurantInput {
  @Field(() => String)
  restaurantId: string;
}
