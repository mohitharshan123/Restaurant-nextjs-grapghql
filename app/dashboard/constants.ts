import routes from "../routes";

export type Link = {
  targetSegment: string | null;
  label: string;
  path: string;
};

export const SIDEBAR_LINKS: Array<Link> = [
  { label: "Menu", path: routes.dashboard.menu, targetSegment: "menu" },
  { label: "Orders", path: routes.dashboard.orders, targetSegment: "orders" },
  { label: "Tables", path: routes.dashboard.tables, targetSegment: "tables" },
  {
    label: "Feedbacks",
    path: routes.dashboard.feedbacks,
    targetSegment: "feedbacks",
  },
  {
    label: "Settings",
    path: routes.dashboard.settings.index,
    targetSegment: "settings",
  },
];
