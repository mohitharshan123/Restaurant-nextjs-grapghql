import { Arg, Query, Resolver, Ctx, Authorized } from "type-graphql";
import { Menu } from "main/menu/menu.schema";
import MenuService from "main/menu/menu.service";

@Resolver()
export default class MenuResolver {
  constructor(private menuService: MenuService) {
    this.menuService = new MenuService();
  }

  @Query(() => Menu)
  @Authorized()
  menu(@Ctx() context: any) {
    return this.menuService.getMenu(context.user);
  }

  @Query(() => Menu)
  getRestaurantMenu(@Arg("restaurantName") restaurantName: string) {
    return this.menuService.getRestaurantMenu(restaurantName);
  }
}
