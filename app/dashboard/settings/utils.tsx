import { Breadcrumbs, Typography } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import routes from "../../routes";

export const renderSettingBreadcrumbs = (title: string) => <Breadcrumbs>
    <Link href={routes.dashboard.settings.index}>
        Settings
    </Link>
    <Typography variant="small" className="font-semibold">
        {title}
    </Typography>
</Breadcrumbs>