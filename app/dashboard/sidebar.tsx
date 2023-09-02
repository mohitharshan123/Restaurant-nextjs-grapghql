"use client";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { PresentationChartBarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import clsx from "clsx";
import { SIDEBAR_LINKS, Link as LinkType } from "./constants";

const Sidebar = () => {
  const activeSegment = useSelectedLayoutSegment();

  return (
    <Card className="bg-gradient-to-br from-[#37474f] to-[#263238] -translate-x-80 fixed inset-0 z-50 h-full my-20 w-72 transition-transform duration-300 xl:translate-x-0">
      <List className="flex flex-col space-y-2 rounded-none">
        {SIDEBAR_LINKS.map((link: LinkType, i: number) => {
          return (
            <Link key={i} href={link.path} className="mt-10">
              <ListItem
                className={clsx(
                  "middle none font-sans font-bold center transition-all shadow-md disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 text-white  hover:shadow-lg active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize",
                  {
                    "bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-500/20":
                      activeSegment === link.targetSegment,
                  },
                )}
              >
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                {link.label}
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Card>
  );
};

export default Sidebar;
