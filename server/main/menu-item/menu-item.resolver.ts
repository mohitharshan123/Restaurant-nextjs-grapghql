import { Arg, Ctx, Mutation, Resolver, Authorized } from "type-graphql";
import MenuItemService from "./menu-item.service";
import { CreateMenuItemInput, MenuItem } from "./menu-item.schema";

@Resolver()
export default class MenuItemResolver {
    constructor(private menuItemService: MenuItemService) {
        this.menuItemService = new MenuItemService();
    }

    @Mutation(() => MenuItem)
    @Authorized()
    createItem(@Arg("input") input: CreateMenuItemInput, @Ctx() context: any) {
        return this.menuItemService.createItem(input, context.user);
    }

}
