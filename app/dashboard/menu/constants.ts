import * as yup from "yup";

export const CATEGORY_FORM_INITIAL_VALUES = { name: "", description: "" }
export const MENU_ITEM_FORM_INITIAL_VALUES = { name: "", description: "", price: "", categoryId: "" }

export const CategorySchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
});

export const MenuItemSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().required("Price is required"),
    imageID: yup.string(),
    categoryId: yup.string().required("Category is required.")
});