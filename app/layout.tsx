import "../styles/global.css";
import Providers from "./providers";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = { title: "Restaurant" };

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <Providers>{children}</Providers>;
};

export default Layout;
