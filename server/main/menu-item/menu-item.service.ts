import { ApolloError } from "apollo-server-errors";
import { RestaurantModel } from "main/restaurant/restaurant.schema";
import mongoose from "mongoose";
import { CreateMenuItemInput, MenuItemModel } from "./menu-item.schema";

class MenuItemService {
    async createItem(input: CreateMenuItemInput, user: any) {
        try {
            const restaurant = await RestaurantModel.findOne({ userId: user.id });
            if (!restaurant) {
                throw new ApolloError(
                    "Restaurant not found.",
                );
            }
            const category = restaurant.menu?.categories.find(({ _id }: { _id: any }) => _id?.toString() === input.categoryId);
            if (!category) {
                throw new ApolloError(
                    "Category not found.",
                );
            }
            const item = await MenuItemModel.create({ ...input, _id: new mongoose.Types.ObjectId() });
            await RestaurantModel.findOneAndUpdate(
                { userId: user.id, "menu.categories._id": category._id },
                { $push: { "menu.categories.$.items": item } }
            );
            return item;
        } catch (error) {
            throw new ApolloError(
                "Unable to create category. Please try again later.",
            );
        }

    }
}

export default MenuItemService;
