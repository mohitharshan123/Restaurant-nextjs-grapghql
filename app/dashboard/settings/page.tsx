"use client";

import { Card, CardBody, Typography } from "@material-tailwind/react"
import React from "react"
import { SETTINGS_CATEGORIES } from "./constants"

const SettingsCategories: React.FC = () =>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-2">
        {Object.entries(SETTINGS_CATEGORIES).map(([_, value]) => {
            const { label, description, icon: Icon } = value
            return <Card className="mt-6 w-60 scale-95 hover:scale-100 ease-in duration-100 cursor-pointer">
                <CardBody>
                    <Icon className="w-12 mb-10" />
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {label}
                    </Typography>
                    <Typography>
                        {description}
                    </Typography>
                </CardBody>
            </Card>
        }
        )}
    </div>



export default SettingsCategories;