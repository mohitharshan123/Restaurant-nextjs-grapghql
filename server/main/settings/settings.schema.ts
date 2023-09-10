import {
    getModelForClass,
    mongoose,
    prop,
} from "@typegoose/typegoose";
import { Role } from "main/roles/roles.schema";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Settings {
    @Field(() => String)
    @prop({ required: true })
    paymentApiKey?: string;

    @Field()
    @prop({ required: false })
    paymentApiSecret?: string;

    @Field(() => [Role])
    @prop({ required: false })
    roles: Role[]

}

export const SettingsModel = mongoose.models.Settings || getModelForClass<typeof Settings>(Settings);


@InputType()
export class UpdateSettingsInput {
    @Field(() => String)
    paymentApiKey?: string | undefined;

    @Field(() => String)
    paymentApiSecret?: string | undefined;

    // @Field(() => [Role])
    // roles?: Role[]
}