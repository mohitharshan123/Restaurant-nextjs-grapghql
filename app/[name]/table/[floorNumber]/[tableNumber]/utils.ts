import { OrderItem } from "./page";
import { CreateOrderPayload } from "./cart";

export const initializeRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };

        document.body.appendChild(script);
    });
};


export const createRazorpayOrder = async (restaurantName: string, items: Array<OrderItem>) => await fetch("/api/razorpay/order", {
    method: "POST", body: JSON.stringify({
        restaurantName, items
    })
}).then((t) =>
    t.json()
);


export const verifyPaymentAndCreateOrder = async (payload: CreateOrderPayload) => await fetch("/api/razorpay/payment/verifyAndCreateOrder", {
    method: "POST", body: JSON.stringify(payload)
})
