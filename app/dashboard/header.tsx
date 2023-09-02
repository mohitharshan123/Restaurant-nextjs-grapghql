"use client"

import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Drawer,
    Navbar,
    Typography,
} from "@material-tailwind/react";
import { UseQueryResult } from "react-query";
import Pusher from "pusher-js"
import { BellIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";

import { useMyRestaurant } from "../hooks/api/useRestaurantApi";
import { useRouter } from "next/navigation";
import routes from "../routes";


const pusher = new Pusher("cf869a27ce58994e88ba", {
    cluster: "ap2",
});

export interface Notification {
    message: string;
    type: "NEW_ORDER";
    link?: string;
}

interface OrderNotification extends Notification {
    tableNumber?: string;
    floorNumber?: string
}

export enum CHANNEL_TYPES {
    ORDERS = "ORDERS"
}

export enum NOTIFICATION_TYPES {
    NEW_ORDER = "NEW_ORDER"
}


const Header: React.FC = () => {
    const router = useRouter();

    const [isNotificationsDrawerOpen, setIsNotificationDrawerOpen] = useState<boolean>(false)
    const { data: restaurant } = useMyRestaurant() as UseQueryResult<{
        name: string;
    }>;

    const handleNotificationClick = (type: string) => {
        const notificationLinks: Record<string, string> = {
            "NEW_ORDER": routes.dashboard.orders
        }

        router.push(notificationLinks[type])
    }


    const [notifications, setNotifications] = useState<Array<Notification>>([{ message: "You have a new order", type: "NEW_ORDER" }]);

    useEffect(() => {
        const channel = pusher.subscribe(CHANNEL_TYPES.ORDERS);

        channel.bind(NOTIFICATION_TYPES.NEW_ORDER, (data: Notification) => {
            setNotifications([...notifications, data]);
        });

        return () => {
            pusher.unsubscribe(CHANNEL_TYPES.ORDERS);
        };
    }, []);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <BellIcon className="h-5 w-5 cursor-pointer" onClick={() => setIsNotificationDrawerOpen(true)} />
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    <UserIcon className="h-5 w-5" />
                </a>
            </Typography>
        </ul>
    );

    return (<>
        <div className="h-20 max-h-[768px] w-[calc(100%+48px)] fixed top-0 z-20">
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        variant="h4"
                        href="#"
                        className="mr-4 cursor-pointer py-1.5 font-bold"
                    >
                        {restaurant?.name}
                    </Typography>
                    <div className="flex items-center gap-4 mr-10">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                    </div>
                </div>
            </Navbar>
        </div>
        <Drawer open={isNotificationsDrawerOpen} onClose={() => setIsNotificationDrawerOpen(false)} placement="right" overlay={false} className="overflow-auto mt-20">
            {notifications.map((notification: OrderNotification) => <Card className="rounded-none">
                <CardBody className="flex flex-col justify-center w-full cursor-pointer" onClick={() => handleNotificationClick(notification.type)}>
                    <div className="flex flex-row space-x-2 ">
                        <ShoppingBagIcon className="w-5 h-5" />
                        <Typography variant="h6">{notification.message}</Typography>
                    </div>
                    <div className="mt-2">
                        <Typography variant="small" className="font-bold text-xs">Floor: {notification.floorNumber}</Typography>
                        <Typography variant="small" className="font-bold text-xs">Table :{notification.tableNumber}</Typography>
                    </div>
                </CardBody>
            </Card>)}
        </Drawer>
    </>
    );
}


export default Header;