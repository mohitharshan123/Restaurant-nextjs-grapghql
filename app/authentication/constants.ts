import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const SignupSchema = yup.object().shape({
  restaurantName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const AUTHENTICATION_FORM_INITIAL_VALUES = {
  restaurantName: "",
  email: "",
  password: "",
};
