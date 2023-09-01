"use client";

import { Accordion, AccordionBody, AccordionHeader, Badge, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, IconButton, iconButton, Input, Step, Stepper, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { UseQueryResult } from "react-query";
import Image from "next/image"
import { useParams } from "next/navigation";

import { CreditCardIcon, ShoppingCartIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

import { useGetRestaurantMenu } from "../../../../hooks/api/useRestaurantApi";
import { Category } from "../../../../dashboard/menu/page";
import Cart from "./cart";
import { MenuItem } from "main/menu-item/menu-item.schema";
import classNames from "classnames";

enum STEPS {
    "order" = 0,
    "cart" = 1
}

export type OrderItem = { id: string, name: string, quantity: number }

const OrderMenu = () => {
    const { name }: any = useParams()
    const { data: menu, isLoading } = useGetRestaurantMenu(name) as UseQueryResult<{
        categories: Category[];
    }>;

    const [activeStep, setActiveStep] = useState<0 | 1>(STEPS.order);
    const [orders, setOrder] = useState<Array<OrderItem>>([]);

    if (!menu || isLoading) return null;

    const handleAddItemToCart = (item: MenuItem) => {
        const updatedOrders = [...orders];
        const itemIndex = updatedOrders.findIndex(orderItem => orderItem.id === item._id);

        if (itemIndex !== -1) {
            updatedOrders[itemIndex].quantity += 1;
        } else {
            updatedOrders.push({ id: item._id, name: item.name, quantity: 1 });
        }
        setOrder(updatedOrders);
    }

    const handleRemoveItemFromCart = (itemId: string) => {
        const updatedOrders = [...orders];
        const itemIndex = updatedOrders.findIndex(item => item.id === itemId);
        if (itemIndex === -1) return
        if (updatedOrders[itemIndex].quantity > 0) {
            updatedOrders[itemIndex].quantity -= 1;

        } else {
            updatedOrders.splice(itemIndex, 1);

        }
        setOrder(updatedOrders);
    }

    const totalOrdersCount = orders.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);

    return <>
        <ButtonGroup className="fixed bottom-0 w-screen z-10">
            <Button onClick={() => setActiveStep(STEPS.order)} className={classNames("w-full flex items-center justify-center", { "bg-blue-400": activeStep === STEPS.cart, "bg-blue-700": activeStep === STEPS.order })}><CreditCardIcon className="w-6" /></Button>
            <Button onClick={() => setActiveStep(STEPS.cart)} className={classNames("w-full flex items-center justify-center", { "bg-blue-400": activeStep === STEPS.order, "bg-blue-700": activeStep === STEPS.cart })}><Badge content={totalOrdersCount}>
                <ShoppingCartIcon className="w-6" /></Badge></Button>
        </ButtonGroup>

        <div className="p-4 overflow-scroll">
            {activeStep === STEPS.order ? <div className="h-full w-full">
                <div className="fixed top-0 rounded-xl left-0 px-4 right-0 py-4 z-10 bg-white shadow-xl max-w-content">
                    <Input label="Serch items" className="bg-white" />
                </div>
                {menu?.categories.map((category: Category) => (
                    <Accordion open className="flex flex-col space-y-2 mt-20">
                        <AccordionHeader >{category.name}</AccordionHeader>
                        <AccordionBody>
                            {category.description}
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10">
                                {category.items.map(item => (
                                    <div className="cursor-pointer">
                                        <Card key={item._id} className="w-full cursor-pointer mt-10">
                                            <CardHeader color="blue-gray" className="relative h-32 cursor-pointer">
                                                <Image
                                                    src={`/api/uploads/${item.imageID}`}
                                                    alt="item-image"
                                                    layout="fill"
                                                    objectFit="cover"
                                                    objectPosition="center"
                                                />
                                            </CardHeader>
                                            <CardBody className="cursor-pointer h-40 overflow-y-scroll">
                                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="small" className="overflow-scroll text-xs">{item.description}</Typography>
                                            </CardBody>
                                            <CardFooter className="pt-0 flex w-full justify-between">
                                                <IconButton className="rounded-full" onClick={() => handleRemoveItemFromCart(item._id)}><MinusIcon className="w-4" /></IconButton>
                                                <Typography variant="h4">{orders.find(({ id }) => id === item._id)?.quantity}</Typography>
                                                <IconButton className="rounded-full" onClick={() => handleAddItemToCart(item)}><PlusIcon className="w-4" /></IconButton>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </AccordionBody>
                    </Accordion>
                ))}
            </div> : <Cart {...{ orders, setActiveStep, setOrder }} />}
        </div></>
}


export default OrderMenu