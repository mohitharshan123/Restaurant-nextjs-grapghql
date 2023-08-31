import { NextRequest, NextResponse } from "next/server";
import mongoose from 'mongoose'
import crypto from "crypto"
import { RestaurantModel } from "main/restaurant/restaurant.schema";
import { OrderModel } from "main/order/order.schema";

export type VerifyResponseData = {
    message: string;
    orderId?: string;
    paymentId?: string;
}

export async function POST(req: NextRequest): Promise<VerifyResponseData> {
    try {

        await mongoose.connect(process.env.DATABASE_URL ?? "");
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            restaurantName,
            orders,
            floorNumber,
            tableNumber
        } = await req.json();
        const restaurant = await RestaurantModel.findOne({ name: restaurantName })
        if (!restaurant) {
            NextResponse.json({ message: 'Restaurant not found' }, { status: 500 })
        }
        const newOrder = await OrderModel.create({
            restaurant, floor: floorNumber,
            table: tableNumber, items: orders, status: "pending",
            razorpayOrderId, razorpayPaymentId, razorpaySignature
        })
        const shasum = crypto.createHmac("sha256", restaurant.settings.paymentApiSecret);

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        if (digest !== razorpaySignature) {
            NextResponse.json({ message: 'Invalid transaction' }, { status: 500 })
        }
        return NextResponse.json({
            message: "Successfully created order",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
};