import React, { useEffect, useState } from "react";
import { DraggableProps, DropProps, Order } from "./page";
import { generateItems, applyDrag } from "./utils";

const COLUMN_NAMES = ["Pending", "Preparing", "Completed"];

const useBoard: Function = ({ orders }: { orders: Order[] }) => {
    const [scene, setScene] = useState<DraggableProps | null>(null);

    useEffect(() => {
        if (!orders) return;

        const pendingOrders = orders.filter(order => order.status === 'pending');
        const preparingOrders = orders.filter(order => order.status === 'preparing');
        const completedOrders = orders.filter(order => order.status === 'completed');
        const orderTypeIndexMap: Record<number, Order[]> = {
            0: pendingOrders,
            1: preparingOrders,
            2: completedOrders
        }

        setScene({
            type: "container",
            props: {
                orientation: "horizontal",
            },
            children: generateItems(3, (i: number) => ({
                id: `column${i}`,
                type: "container",
                name: COLUMN_NAMES[i],
                props: {
                    orientation: "vertical",
                },
                children: orderTypeIndexMap[i].map((order, j) => ({
                    type: "draggable",
                    id: `${i}${j}`,
                    ...order,
                })),
            })),
        });
    }, [orders]);


    const getCardPayload = (columnId: string, index: number) => {
        if (scene?.children) {
            const column = scene.children.find((p: DraggableProps) => p.id === columnId);
            if (column && column.children) {
                return column.children[index];
            }
        }
        return null;
    };

    const handleCardDrop = (columnId: string, dropResult: DropProps) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            if (scene?.children) {
                const columnIndex = scene.children.findIndex((p: DraggableProps) => p.id === columnId);

                if (columnIndex !== -1) {
                    const updatedScene = { ...scene };
                    if (!updatedScene.children) return
                    const column = updatedScene.children[columnIndex];

                    if (column.children) {
                        const newColumn = { ...column };
                        newColumn.children = applyDrag(newColumn.children || [], dropResult);
                        updatedScene.children.splice(columnIndex, 1, newColumn);

                        setScene(updatedScene);
                    }
                }
            }
        }
    };

    return { handleCardDrop, getCardPayload, scene }

}

export default useBoard