import { Arg, Ctx, Mutation, Query, Resolver, Authorized } from "type-graphql";
import { Settings, UpdateSettingsInput } from "./settings.schema";
import SettingsService from "./settings.service";

@Resolver()
export default class SettingsResolver {
    constructor(private settingsService: SettingsService) {
        this.settingsService = new SettingsService();
    }

    @Mutation(() => Settings)
    @Authorized()
    updateSettings(@Arg("input") input: UpdateSettingsInput, @Ctx() context: any) {
        return this.settingsService.updateSettings(input, context.user.id);
    }

    @Query(() => Settings, { nullable: true })
    @Authorized()
    settings(@Ctx() context: any) {
        return this.settingsService.getSettings(context.user.id);
    }
}
