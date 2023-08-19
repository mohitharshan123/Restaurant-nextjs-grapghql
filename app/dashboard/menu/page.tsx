"use client";

import React, { PropsWithChildren, useState } from "react";
import Actions from "../../../components/actions";
import CategoryForm from "./category-form";
import { renderActions } from "./utils";

const Menu: React.FC = () => {
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState<boolean>(false);
  const [isMenuItemFormOpen, setIsItemFormOpen] = useState<boolean>(false)

  return (
    <div className="relative h-full w-full">
      <p>Menu</p>
      <Actions actions={renderActions({ setIsCategoryFormOpen, setIsItemFormOpen })} />
      <CategoryForm isOpen={isCategoryFormOpen} setIsOpen={setIsCategoryFormOpen} />
    </div>
  );
};

export default Menu;
