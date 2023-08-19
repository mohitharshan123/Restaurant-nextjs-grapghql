import * as yup from "yup";

export const CATEGORY_FORM_INITIAL_VALUES = { name: "", description: "" }

export const CategorySchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Email is required"),
});
