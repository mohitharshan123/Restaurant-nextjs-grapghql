import { ApolloError } from "apollo-server-errors";
import {
    RestaurantModel,
} from "main/restaurant/restaurant.schema";
import { UpdateSettingsInput } from "./settings.schema";

class SettingsService {
    async updateSettings(input: UpdateSettingsInput, userID: string) {
        try {
            const restaurant = await RestaurantModel.findOne({
                userID,
            });

            console.log({ restaurant })
            if (!restaurant) {
                throw new ApolloError("Restaurant not found");
            }
            const updatedSettings = {
                paymentApiKey: input.paymentApiKey,
                paymentApiSecret: input.paymentApiSecret
            };

            restaurant.settings = updatedSettings
            await restaurant.save();
            return restaurant.settings;
        }
        catch (error) {
            throw new ApolloError(
                "Unable to update settings. Please try again later.",
            );
        }
    }

    async getSettings(userID: string) {
        try {
            const restaurant = await RestaurantModel.findOne({
                userID,
            });

            if (!restaurant) {
                throw new ApolloError("Restaurant not found");
            }

            return restaurant.settings;
        } catch (error) {
            throw new ApolloError(
                "Unable to fetch settings. Please try again later.",
            );
        }
    }

}

export default SettingsService;
