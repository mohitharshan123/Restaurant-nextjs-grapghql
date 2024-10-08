import { getModelForClass, mongoose, prop } from "@typegoose/typegoose";
import { MenuItem } from "main/menu-item/menu-item.schema";
import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
export class Category {
  @Field() 
  _id: string; 

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true })
  description: string;

  @Field(() => [MenuItem])
  @prop({ required: false })
  items: MenuItem[]
}

export const CategoryModel = mongoose.models.Category || getModelForClass(Category);

@InputType()
export class CreateCategoryInput {

  @Field()
  name: string;

  @Field()
  description: string;
}


@InputType()
export class GetCategoryInput {
  @Field(() => String)
  categoryId: string;
}
