import React from "react";
import {
    CircleStackIcon,
    CogIcon,
} from "@heroicons/react/24/outline";

type RenderActionProps = {
    setIsMenuItemFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setIsCategoryFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type ActionItem = {
    label: string,
    icon: any,
    action: () => void
}


export const renderActions = ({ setIsCategoryFormOpen, setIsMenuItemFormOpen }: RenderActionProps): ActionItem[] => ([{
    label: "Category",
    icon: CircleStackIcon,
    action: () => setIsCategoryFormOpen(true)
},
{
    label: "Item",
    icon: CogIcon,
    action: () => setIsMenuItemFormOpen(true)
}])