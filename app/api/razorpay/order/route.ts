import PaymentHelper from "@/utils/payment";
import { NextRequest, NextResponse } from "next/server";
import mongoose from 'mongoose'

export async function POST(req: NextRequest) {
    try {
        const input = await req.json();

        await mongoose.connect(process.env.DATABASE_URL ?? "");

        const paymentHelper = new PaymentHelper(input.restaurantName, input.items);

        const response = await paymentHelper.createOrder();

        await mongoose.disconnect();

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.error();
    }
}
