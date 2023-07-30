"use client";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

const Sidebar = () => {
  return (
    <Card className="bg-gradient-to-br from-[#37474f] to-[#263238] -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="white">
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem className="text-white">
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5 mr-3 text-white" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem className="text-white">
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5 mr-3 text-white" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem className="text-white">
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5 mr-3 text-white" />
          </ListItemPrefix>
          Logout
        </ListItem>
      </List>
    </Card>
  );
};

export default Sidebar;
