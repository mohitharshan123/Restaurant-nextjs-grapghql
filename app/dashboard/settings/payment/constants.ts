import * as yup from "yup";

export const PaymentSchema = yup.object().shape({
    paymentApiKey: yup
        .string()
        .required("API key is required."),
    paymentApiSecret: yup.string().required("API Secret is required."),
});

export const PAYMENT_SETTINGS_FORM_INITIAL_VALUES = {
    paymentApiKey: "",
    paymentApiSecret: "",
};
