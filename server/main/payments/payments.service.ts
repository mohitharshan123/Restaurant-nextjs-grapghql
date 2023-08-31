import { ApolloError } from "apollo-server-errors";
import { RestaurantModel } from "main/restaurant/restaurant.schema";
import Razorpay from "razorpay";

class PaymentsService {
    async getPayments(user: any) {
        try {
            const restaurant = await RestaurantModel.findOne({
                userID: user.id,
            })
            if (!restaurant) {
                throw new ApolloError(
                    "Restaurant not found",
                );
            }
            const razorpay = new Razorpay({
                key_id: restaurant.settings?.paymentApiKey,
                key_secret: restaurant.settings?.paymentApiSecret,
            });

            const payments = await razorpay.payments.all();
            return payments

        } catch (error) {
            throw new ApolloError(
                "Unable to fetch payments. Please try again later.",
            );
        }
    }
}

export default PaymentsService;
