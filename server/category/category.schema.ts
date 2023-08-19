import { getModelForClass, prop } from "@typegoose/typegoose";
import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
export class Category {
  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true })
  description: string;

  @Field(() => String)
  @prop({ required: true })
  imageUrl: string;
}

export const CategoryModel = getModelForClass(Category);

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => String)
  @prop({ required: true })
  imageUrl: string;
}


@InputType()
export class GetCategoryInput {
  @Field(() => String)
  categoryId: string;
}
