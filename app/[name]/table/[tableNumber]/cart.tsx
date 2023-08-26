"use client"

import { Typography } from "@material-tailwind/react";

const Cart: React.FC<{ orders: { [key: string]: number } }> = ({ orders }) => {
    return <div className="flex flex-col space-y-4 mt-20">
        {Object.entries(orders).map(([item, count]) => <Typography variant="h4">{item} x {count}</Typography>)}
    </div>
}

export default Cart;