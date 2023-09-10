"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";

import Actions from "../../../components/actions";
import { useGetMenu } from "../../hooks/api/useRestaurantApi";
import CategoryForm from "./category-form";
import { renderActions } from "./utils";
import { UseQueryResult } from "react-query";
import MenuItemForm from "./menu-item-form";

export type Category = {
  _id: string,
  name: string,
  description: string,
  items: Array<any>
}

const Menu: React.FC = () => {
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState<boolean>(false);
  const [isMenuItemFormOpen, setIsMenuItemFormOpen] = useState<boolean>(false)
  const { data: menu, isLoading } = useGetMenu() as UseQueryResult<{
    categories: Category[];
  }>;


  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? null : value);

  if (!menu || isLoading) return null;

  return (
    <div className="relative h-full w-full">
      <Actions actions={renderActions({ setIsCategoryFormOpen, setIsMenuItemFormOpen })} />
      <CategoryForm isOpen={isCategoryFormOpen} setIsOpen={setIsCategoryFormOpen} />
      <MenuItemForm isOpen={isMenuItemFormOpen} setIsOpen={setIsMenuItemFormOpen} />
      {menu?.categories.map((category: Category, index) => (
        <Accordion open={open === index} className="flex flex-col space-y-2">
          <AccordionHeader onClick={() => handleOpen(index)} className="cursor-pointer">{category.name}</AccordionHeader>
          <AccordionBody>
            {category.description}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10">
              {category.items.map((item) => (
                <div className="cursor-pointer">
                  <Card key={item._id} className="w-full cursor-pointer">
                    <CardHeader color="blue-gray" className="relative h-32 cursor-pointer">
                      <Image
                        src={`/api/uploads/${item.imageID}`}
                        alt="item-image"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </CardHeader>
                    <CardBody className="cursor-pointer h-64 overflow-y-scroll">
                      <Typography variant="h5" color="blue-gray" className="mb-2">
                        {item.name}
                      </Typography>
                      <Typography variant="small" className="overflow-scroll text-xs">{item.description}</Typography>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
};

export default Menu;
