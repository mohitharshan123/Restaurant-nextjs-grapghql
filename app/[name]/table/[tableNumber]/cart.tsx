"use client"

import { Button, Typography } from "@material-tailwind/react";
import { initializeRazorpay } from "./utils";

const Cart: React.FC<{ orders: { [key: string]: number } }> = ({ orders }) => {

    const makePayment = async () => {
        const res = await initializeRazorpay();

        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }

        var options = {
            key: process.env.RAZORPAY_KEY, 
            name: "Manu Arora Pvt Ltd",
            currency: "INR",
            amount: 299,
            order_id: "order_12345",
            description: "Thankyou for your test donation",
            image: "https://manuarora.in/logo.png",
            handler: function (response) {
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature);
            },
            prefill: {
                name: "Manu Arora",
                email: "manuarorawork@gmail.com",
                contact: "9999999999",
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