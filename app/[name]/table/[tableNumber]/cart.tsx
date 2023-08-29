"use client"

import { Button, Typography } from "@material-tailwind/react";
import { useParams } from "next/navigation";
import { buildOrderItems, initializeRazorpay } from "./utils";

const Cart: React.FC<{ orders: { [key: string]: number } }> = ({ orders }) => {
    const { name }: any = useParams()

    const makePayment = async () => {
        await initializeRazorpay();
        const data = await fetch("/api/razorpay", {
            method: "POST", body: JSON.stringify({
                restaurantName: name, items: buildOrderItems(orders)
            })
        }).then((t) =>
            t.json()
        );

        var options = {
            key: data.apiKey,
            name,
            currency: data.currency,
            amount: data.amount,
            order_id: data.id,
            description: "Enjoy your meal!",
            image: "https://manuarora.in/logo.png",
            handler: function (response: any) {
                if (typeof response.razorpay_payment_id == 'undefined' || response.razorpay_payment_id < 1) {
                    // Error
                } else {
                    //Create order for restaurant
                }
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return <div className="flex flex-col space-y-4 mt-20">
        {Object.entries(orders).map(([item, count]) => <Typography variant="h4">{item} x {count}</Typography>)}
        <Button onClick={makePayment}>Make payment</Button>
    </div>
}

export default Cart;