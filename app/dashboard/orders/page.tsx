"use client";

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Button,
    Card,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import { isEmpty } from "class-validator";
import classnames from "classnames";
import React, { useState } from "react";
import { UseQueryResult } from "react-query";
import { useFetchOrders } from "../../hooks/api/useOrdersApi";
import { useMyRestaurant } from "../../hooks/api/useRestaurantApi";
import { OrderItem } from "../../[name]/table/[floorNumber]/[tableNumber]/page";

const tabs: Array<{ label: string, value: "pending" | "cancelled" | "completed" }> = [
    {
        label: "Pending",
        value: "pending",
    },
    {
        label: "Completed",
        value: "completed",
    },
    {
        label: "Cancelled",
        value: "cancelled",
    },

];

export type Order = {
    floor: string;
    items?: Array<OrderItem>;
    status: string;
    table: string;
};


const Orders = () => {
    const { data: orders } = useFetchOrders() as UseQueryResult<Array<Order>>;
    const { data: restaurant } = useMyRestaurant() as UseQueryResult<{
        name: string;
        floorPlan: Record<string, number[]>
    }>;

    const [selectedTab, setSelectedTab] = useState<"pending" | "completed" | "cancelled">("pending")

    if (!orders) return null;

    return <Tabs value={selectedTab}>
        <TabsHeader>
            {tabs.map(({ label, value }) => (
                <Tab key={value} value={value} onClick={() => setSelectedTab(value)}>
                    {label} ({orders.length})
                </Tab>
            ))}
        </TabsHeader>
        <TabsBody className="w-full flex flex-col">
            {selectedTab === "pending" && orders?.map(({ table, floor, items }) => <Card className="mt-6 w-full">
                <CardBody className="flex flex-row">
                    <div className="flex flex-col space-y-2 w-1/4">
                        <Typography variant="h6" color="blue-gray" className="mb-2">
                            Floor {floor} / Table {table}
                        </Typography>
                        {!isEmpty(items) && items?.map(({ name, quantity }) =>
                            <Typography>
                                {name} X {quantity}
                            </Typography>
                        )}
                    </div>
                    <div className="w-full h-full">
                        <CardBody className="h-full overflow-y-scroll justify-center items-center flex flex-col">
                            <div className="grid grid-cols-1 sm:grid-cols-10 md:grid-cols-10 lg:grid-cols-10 gap-3 mt-10">
                                {Array.from({ length: 80 }, (_, index) => <Card className="w-10 h-10 cursor-pointer">
                                    <CardBody className={classnames("cursor-pointer h-10 items-center justify-center flex rounded-xl", { "bg-red-200": Number(table) === index + 1, "bg-amber-200": restaurant?.floorPlan[floor].includes(index) && Number(table) !== index + 1 })}>
                                        {index + 1}
                                    </CardBody>
                                </Card>)}
                            </div>
                        </CardBody>
                    </div>

                </CardBody>
                <CardFooter className="pt-0">
                    <Button className="rounded-xl">Mark as completed</Button>
                </CardFooter>
            </Card>)}
        </TabsBody>
    </Tabs>
}

export default Orders;
