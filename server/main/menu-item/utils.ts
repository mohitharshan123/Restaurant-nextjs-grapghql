import { MenuItem, MenuItemModel } from "./menu-item.schema";
import { Menu } from "../menu/menu.schema";

const createMenuItems = (menu: Menu, items: Array<any>) =>
  items.map((item: MenuItem) => {
    const menuItem = new MenuItemModel();
    menuItem.name = item.name;
    menuItem.description = item.description;
    menuItem.price = item.price;
    menuItem.imageID = item.imageID;
    menuItem.menu = menu;
    menuItem.save();
    return menuItem;
  });

export { createMenuItems };
