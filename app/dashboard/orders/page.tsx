"use client";

import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { isEmpty } from "class-validator";
import React from "react";
import { UseQueryResult } from "react-query";
import { useFetchOrders } from "../../hooks/api/useOrdersApi";
import { OrderItem } from "../../[name]/table/[floorNumber]/[tableNumber]/page";

export type Order = {
    floor: string;
    items?: Array<OrderItem>;
    status: "pending" | "preparing" | "completed";
    table: string;
};

type DraggableItem = {
    type: string;
    id: string;
    name: string;
    children?: DraggableItem[]
}

export type DraggableProps = {
    type?: string,
    children?: DraggableItem[],
    props?: { orientation: string }
    id?: string;
}

export type DropProps = {
    removedIndex: number, addedIndex: number, payload: any
}


import { Container, Draggable } from "react-smooth-dnd";
import useBoard from "./useBoard";

const Cards: React.FC = () => {
    const { data: orders } = useFetchOrders() as UseQueryResult<Array<Order>>;
    const { handleCardDrop, getCardPayload, scene } = useBoard({ orders });

    return (
        <div className="card-scene">
            <div
                className="flex flex-row w-full space-x-2"
            >
                {scene?.children?.map((column: any) => (
                    <div key={column.id} className="w-full">
                        <div className={column.props.className}>
                            <div className="card-column-header">
                                <Typography variant="h6">{column.name}</Typography>
                            </div>
                            <Container
                                {...column.props}
                                groupName="col"
                                onDrop={e => handleCardDrop(column.id, e)}
                                getChildPayload={index => getCardPayload(column.id, index)}
                                dragClass="card-ghost"
                                dropClass="card-ghost-drop"
                                dropPlaceholder={{
                                    animationDuration: 150,
                                    showOnTop: true,
                                    className: 'drop-preview',
                                }}
                                style={{ minHeight: 800, overflow: "scroll", height: "100vh", marginBottom: 100 }}
                                dropPlaceholderAnimationDuration={200}
                            >
                                {column?.children?.map((card: any) => (
                                    <Draggable key={card.id}>
                                        <Card className="mt-2">
                                            <CardBody className="flex flex-row">
                                                <div className="flex flex-col space-y-2 w-1/4">
                                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                                        Floor {card.floor} / Table {card.table}
                                                    </Typography>
                                                    {!isEmpty(card.items) && (
                                                        card.items as OrderItem[])?.map(({ name, quantity }) =>
                                                            <Typography>
                                                                {name} X {quantity}
                                                            </Typography>
                                                        )}
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Draggable>
                                ))}
                            </Container>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cards;
