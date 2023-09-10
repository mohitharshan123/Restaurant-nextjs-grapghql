import { getModelForClass, mongoose, prop } from "@typegoose/typegoose";
import { ObjectType, Field, InputType, ID } from "type-graphql";

@ObjectType()
export class Permission {
    @Field(() => String)
    @prop({ required: true })
    key: string;

    @Field(() => String)
    @prop({ required: true })
    description: string;
}

export const PermissionModel = mongoose.models.Permission || getModelForClass(Permission);

@ObjectType()
export class Role {
    @Field(() => String)
    @prop({ required: true })
    name: string;

    @Field(() => [Permission])
    @prop({ required: true })
    permissions: Permission[];
}

export const RoleModel = mongoose.models.Role || getModelForClass(Role);
