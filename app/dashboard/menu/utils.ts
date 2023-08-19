import React from "react";
import {
    CircleStackIcon,
    CogIcon,
} from "@heroicons/react/24/outline";

type RenderActionProps = {
    setIsItemFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setIsCategoryFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type ActionItem = {
    label: string,
    icon: any,
    action: () => void
}


export const renderActions = ({ setIsCategoryFormOpen, setIsItemFormOpen }: RenderActionProps): ActionItem[] => ([{
    label: "Category",
    icon: CircleStackIcon,
    action: () => setIsCategoryFormOpen(true)
},
{
    label: "Item",
    icon: CogIcon,
    action: () => setIsItemFormOpen(true)
}])