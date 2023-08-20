import { getModelForClass, prop } from "@typegoose/typegoose";
import { ObjectType, Field, InputType } from "type-graphql";

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
  imageID: string;
}


@InputType()
export class CreateMenuItemInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => String)
  price: number;

  @Field(() => String)
  imageID?: string;
  
  @Field(() => String)
  categoryId: string;
}

export const MenuItemModel = getModelForClass(MenuItem);
