import { ApolloError } from "apollo-server-errors";
import { CategoryModel, CreateCategoryInput } from "./category.schema";

class CategoryService {
    async createCategory(input: CreateCategoryInput) {
        return CategoryModel.create(input);
    }
    async getCategory(_id: string) {
        try {
            const category = await CategoryModel.findOne({ _id });
            return category;
        } catch (error) {
            throw new ApolloError(
                "Unable to fetch restaurants. Please try again later.",
            );
        }
    }
}

export default CategoryService;
