import { WrenchIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import React from "react";
import routes from "../../routes";


export type SettingCategory = {
    label: string;
    description: string;
    link: string,
    icon: React.FC<any>
}

export const SETTINGS_CATEGORIES: { [key: string]: SettingCategory } = {
    "general": {
        label: "General settings",
        description: "Update restaurant name, logo, contact info etc.",
        link: routes.dashboard.settings.general,
        icon: WrenchIcon
    },
    "payment": {
        label: "Payment Integration",
        description: "Update payment integration info.",
        link: routes.dashboard.settings.payment,
        icon: CurrencyDollarIcon
    },
    "working_hours": {
        label: "Working Hours",
        description: "Update restaurant working hours.",
        link: routes.dashboard.settings.payment,
        icon: CurrencyDollarIcon
    },
    "qr_scanner_styling": {
        label: "QR Scanner Styling",
        description: "Update QR Scanner styles.",
        link: routes.dashboard.settings.payment,
        icon: CurrencyDollarIcon
    },
    "bill_settings": {
        label: "Bill Settings",
        description: "Update additional charges, GST etc on bill.",
        link: routes.dashboard.settings.payment,
        icon: CurrencyDollarIcon
    },
}