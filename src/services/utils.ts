import { MenuItem, MenuItemModel } from "../schema/menu-item.schema";
import { Menu, MenuItemInput } from "../schema/menu.schema";

const createMenuItems = (menu: Menu, items: Array<MenuItemInput>) =>
  items.map((item: MenuItem) => {
    const menuItem = new MenuItemModel();
    menuItem.name = item.name;
    menuItem.description = item.description;
    menuItem.price = item.price;
    menuItem.imageUrl = item.imageUrl;
    menuItem.menu = menu;
    menuItem.save();
    return menuItem;
  });

export { createMenuItems };
