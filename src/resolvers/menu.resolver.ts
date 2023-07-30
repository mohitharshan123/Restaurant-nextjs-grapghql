import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateMenuInput, GetMenuInput, Menu } from "@/schema/menu.schema";
import MenuService from "@/services/menu.service";

@Resolver()
export default class MenuResolver {
  constructor(private menuService: MenuService) {
    this.menuService = new MenuService();
  }

  @Mutation(() => Menu)
  createMenu(@Arg("input") input: CreateMenuInput) {
    return this.menuService.createMenu(input);
  }

  @Query(() => Menu)
  menu(@Arg("id") input: GetMenuInput) {
    return this.menuService.getMenu(input);
  }
}
