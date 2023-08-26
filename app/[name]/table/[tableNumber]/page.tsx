"use client";

import { Accordion, AccordionBody, AccordionHeader, Badge, Card, CardBody, CardFooter, CardHeader, IconButton, iconButton, Step, Stepper, Typography } from "@material-tailwind/react";
import React, { useMemo, useState } from "react";
import { UseQueryResult } from "react-query";
import Image from "next/image"
import { useParams } from "next/navigation";

import { CreditCardIcon, ShoppingCartIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

import { useGetRestaurantMenu } from "../../../hooks/api/useRestaurantApi";
import { Category } from "../../../dashboard/menu/page";

enum STEPS {
    "order" = 0,
    "cart" = 1
}

const OrderMenu = () => {
    const { name }: any = useParams()
    const { data: menu, isLoading } = useGetRestaurantMenu(name) as UseQueryResult<{
        categories: Category[];
    }>;

    const [activeStep, setActiveStep] = useState<0 | 1>(STEPS.order);
    const [orders, setOrder] = useState<{ [key: string]: number }>({});

    if (!menu || isLoading) return null;

    const handleAddItemToCart = (item: string) => {
        let cartItems = { ...orders };
        if (item in orders) {
            cartItems[item] += 1;
        } else { cartItems[item] = 1 }

        setOrder(cartItems)
    }

    const handleRemoveItemFromCart = (item: string) => {
        let cartItems = { ...orders };
        if (item in orders) {
            cartItems[item] -= 1;
        } else { delete cartItems[item] }

        setOrder(cartItems)
    }

    const totalOrdersCount = Object.values(orders).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return <div className="p-4"><Stepper
        className="fixed z-10 right-4 left-4 w-3/2 top-4"
        activeStep={activeStep}

    >
        <Step className="cursor-pointer" onClick={() => setActiveStep(STEPS.order)}><CreditCardIcon className="w-6" /></Step>
        <Step className="cursor-pointer" onClick={() => setActiveStep(STEPS.cart)}><Badge content={totalOrdersCount}>
            <ShoppingCartIcon className="w-6" /></Badge></Step>
    </Stepper> {activeStep === STEPS.order ? <div className="h-full w-full mt-20">
        {menu?.categories.map((category: Category) => (
            <Accordion open className="flex flex-col space-y-2">
                <AccordionHeader >{category.name}</AccordionHeader>
                <AccordionBody>
                    {category.description}
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10">
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
                                    <CardBody className="cursor-pointer h-64 overflow-y-scroll">
                                        <Typography variant="h5" color="blue-gray" className="mb-2">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="small" className="overflow-scroll text-xs">{item.description}</Typography>
                                    </CardBody>
                                    <CardFooter className="pt-0 flex w-full justify-between">
                                        <IconButton className="rounded-full" onClick={() => handleRemoveItemFromCart(item.name)}><MinusIcon className="w-4" /></IconButton>
                                        <Typography variant="h4">{orders[item.name]}</Typography>
                                        <IconButton className="rounded-full" onClick={() => handleAddItemToCart(item.name)}><PlusIcon className="w-4" /></IconButton>
                                    </CardFooter>
                                </Card>
                            </div>
                        ))}
                    </div>
                </AccordionBody>
            </Accordion>
        ))}
    </div> : null}
    </div>
}


export default OrderMenu