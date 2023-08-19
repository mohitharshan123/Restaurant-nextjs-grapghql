import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateMenuInput, GetMenuInput, Menu } from "menu/menu.schema";
import CategoryService from "./category.service";
import { Category, CreateCategoryInput, GetCategoryInput } from "./category.schema";

@Resolver()
export default class CategoryResolver {
  constructor(private categoryService: CategoryService) {
    this.categoryService = new CategoryService();
  }

  @Mutation(() => Category)
  createCategory(@Arg("input") input: CreateCategoryInput) {
    return this.categoryService.createCategory(input);
  }

  @Query(() => Category)
  category(@Arg("id") input: string) {
    return this.categoryService.getCategory(input);
  }
}
