import { Arg, Ctx, Mutation, Query, Resolver, Authorized } from "type-graphql";
import CategoryService from "./category.service";
import { Category, CreateCategoryInput, GetCategoryInput } from "./category.schema";

@Resolver()
export default class CategoryResolver {
  constructor(private categoryService: CategoryService) {
    this.categoryService = new CategoryService();
  }

  @Mutation(() => Category)
  @Authorized()
  createCategory(@Arg("input") input: CreateCategoryInput, @Ctx() context: any) {
    return this.categoryService.createCategory(input, context.user);
  }

  @Query(() => Category)
  category(@Arg("id") input: string) {
    return this.categoryService.getCategory(input);
  }
}
