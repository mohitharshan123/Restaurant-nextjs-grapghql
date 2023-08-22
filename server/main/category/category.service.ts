import { ApolloError } from "apollo-server-errors";
import { RestaurantModel } from "main/restaurant/restaurant.schema";
import mongoose from "mongoose";
import { CategoryModel, CreateCategoryInput } from "./category.schema";

class CategoryService {
    async createCategory(input: CreateCategoryInput, user: any) {
        try {
            const category = await CategoryModel.create({ ...input, _id: new mongoose.Types.ObjectId() });
            const restaurant = await RestaurantModel.findOne({ userId: user.id })
            if (!restaurant) {
                throw new ApolloError(
                    "There are no restaurants associated with this user.",
                );
            }
            if (!restaurant.menu) {
                throw new ApolloError(
                    "There are no menu associated with this restaurant. Please contact administrator.",
                );
            }
            restaurant.menu.categories.push(category);
            await restaurant.save();
            return category
        } catch (error) {
            throw new ApolloError(
                "Unable to create category. Please try again later.",
            );
        }

    }
    async getCategory(_id: string) {
        try {
            const category = await CategoryModel.findOne({ _id });
            return category;
        } catch (error) {
            throw new ApolloError(
                "Unable to fetch category. Please try again later.",
            );
        }
    }
}

export default CategoryService;
