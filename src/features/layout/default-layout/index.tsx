import * as React from "react";
import MiniDrawer from "@features/navigation/drawer";
import { defaultLayout } from "./type";

const DefaultLayout: React.FunctionComponent<defaultLayout> = ({
  children,
}) => {
  return <MiniDrawer>{children}</MiniDrawer>;
};

export default DefaultLayout;
