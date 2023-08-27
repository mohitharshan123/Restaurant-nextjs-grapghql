import {
    getModelForClass,
    prop,
} from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Settings {
    @Field(() => String)
    @prop({ required: true })
    paymentApiKey: string;

    @Field()
    @prop({ required: false })
    paymentApiSecret?: string;
}

export const SettingsModel = getModelForClass<typeof Settings>(Settings);


@InputType()
export class UpdateSettingsInput {
    @Field(() => String)
    paymentApiKey?: string | undefined;

    @Field(() => String)
    paymentApiSecret?: string | undefined;
}