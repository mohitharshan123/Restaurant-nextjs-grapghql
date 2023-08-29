import { MenuItemModel } from "main/menu-item/menu-item.schema";
import { RestaurantModel } from "main/restaurant/restaurant.schema";
import Razorpay from "razorpay";
import shortid from "shortid";

export type PaymentResponse = {
    id: string;
    amount: string | number;
    currency: string;
    apiKey: string;
};

export default class PaymentHelper {
    constructor(private restaurantName: string, private items: Array<{ name: string; quantity: number }>) {
        this.restaurantName = restaurantName;
        this.items = items;
    }

    async createOrder(): Promise<PaymentResponse> {
        const restaurant = await this.getRestaurant();
        const menuItems = await this.getMenuItems();
        const totalPrice = this.calculateTotalPrice(menuItems);

        const response = await this.createRazorpayOrder(restaurant.settings.paymentApiKey,
            restaurant.settings.paymentApiSecret, totalPrice);

        return {
            id: response.id,
            amount: response.amount,
            currency: response.currency,
            apiKey: restaurant.settings.paymentApiKey,
        };
    }

    private async getRestaurant() {
        const restaurant = await RestaurantModel.findOne({ name: this.restaurantName });
        if (!restaurant) {
            throw new Error("Restaurant not found");
        }
        return restaurant;
    }

    private async getMenuItems() {
        const menuItems = await MenuItemModel.find({ name: { $in: this.items.map(({ name }) => name) } });
        return menuItems;
    }

    private calculateTotalPrice(menuItems: any[]) {
        return this.items.reduce((total, { name, quantity }) => {
            const menuItem = menuItems.find(item => item.name === name);
            if (menuItem) {
                total += menuItem.price * quantity;
            }
            return total;
        }, 0);
    }

    private async createRazorpayOrder(apiKey: string, apiSecret: string, totalPrice: number) {
        const razorpay = new Razorpay({
            key_id: apiKey,
            key_secret: apiSecret,
        });

        const payment_capture = 1;
        const currency = "INR";
        const options = {
            amount: (totalPrice * 100).toString(),
            currency,
            receipt: shortid.generate(),
            payment_capture,
        };

        const response = await razorpay.orders.create(options);
        return response;
    }
}
