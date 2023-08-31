"use client"

import { Button, Typography } from "@material-tailwind/react";
import { useParams } from "next/navigation";
import { SetStateAction } from "react";
import { toast } from "react-toastify";
import { OrderItem } from "./page";
import { createRazorpayOrder, initializeRazorpay, verifyPaymentAndCreateOrder } from "./utils";
import Script from "next/script";

type CartProps = {
    orders: Array<OrderItem>,
    setActiveStep: React.Dispatch<SetStateAction<0 | 1>>
}

export type CreateOrderPayload = {
    orderCreationId: string;
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;
    restaurantName: string;
    orders: Array<OrderItem>;
    floorNumber: string;
    tableNumber: string;
}

const Cart: React.FC<CartProps> = ({ orders, setActiveStep }) => {
    const { name, floorNumber, tableNumber }: any = useParams();

    const makePayment = async () => {
        const data = await createRazorpayOrder(name, orders);
        var options = {
            key: data.apiKey,
            name,
            currency: data.currency,
            amount: data.amount,
            order_id: data.id,
            description: "Enjoy your meal!",
            image: "https://manuarora.in/logo.png",
            handler: async function (response: any) {
                if (typeof response.razorpay_payment_id == 'undefined' || response.razorpay_payment_id < 1) {
                    toast('An error occuured while creating the order',
                        {
                            hideProgressBar: true, autoClose: 2000,
                            type: 'error', position: 'bottom-right'
                        })

                    //Reverse the payment
                } else {
                    const payload = {
                        orderCreationId: data.id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                        restaurantName: name,
                        orders,
                        floorNumber,
                        tableNumber
                    };
                    const result = await verifyPaymentAndCreateOrder(payload);
                    const responseData = await result.json();
      
                    toast(await responseData?.message,
                        {
                            hideProgressBar: true, autoClose: 2000,
                            type: 'success', position: 'bottom-right'
                        });

                    setActiveStep(0)
                }
            },
        };

        // @ts-ignore
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return <div className="flex flex-col space-y-4 mt-20">
        {orders.map(order => <Typography variant="h4">{order.name} x {order.quantity}</Typography>)}
        <Script
            id="razorpay-checkout-js"
            src="https://checkout.razorpay.com/v1/checkout.js"
        />
        <Button onClick={makePayment}>Make payment</Button>
    </div>
}

export default Cart;