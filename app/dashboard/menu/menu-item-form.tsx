import React, { useState } from "react";
import {
    Drawer,
    Button,
    Typography,
    IconButton,
    Input,
    Textarea,
    Select,
    Option
} from "@material-tailwind/react";
import {
    XMarkIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import { MenuItemSchema, MENU_ITEM_FORM_INITIAL_VALUES } from "./constants";

import ImageUploader from "../../../components/image-uploader";
import { useCreateMenuItem } from "../../hooks/api/useMenuItemApi";
import { useGetMenu } from "../../hooks/api/useRestaurantApi";
import { UseQueryResult } from "react-query";
import { Category } from "./page";


type MenuItemFormProps = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({ isOpen, setIsOpen }) => {
    const { mutate: createItem, isLoading: isCreatingItem } = useCreateMenuItem();
    const { data: menu } = useGetMenu() as UseQueryResult<{
        categories: Category[];
    }>;
    const [uploadedFileId, setUploadedFileId] = useState<string>("")
    const formik = useFormik({
        initialValues: MENU_ITEM_FORM_INITIAL_VALUES,
        validationSchema: MenuItemSchema,
        validateOnMount: false,
        enableReinitialize: true,
        validateOnChange: false,
        onSubmit: (values) => {
            createItem(
                { input: { ...values, imageID: uploadedFileId } },
                {
                    onSuccess: () => {
                        toast('Successfully Created',
                            {
                                hideProgressBar: true, autoClose: 2000,
                                type: 'success', position: 'bottom-right'
                            })
                        handleClose();
                    },
                    onError: (error) => console.log(error)
                })
        },
    });

    const handleClose = () => {
        setIsOpen(false);
        formik.resetForm();
        setUploadedFileId("")
    }

    return (
        <Drawer open={isOpen} onClose={handleClose} placement="right" overlay={false} className="overflow-auto">
            <div className="mb-2 flex items-center justify-between p-4">
                <Typography variant="h4" color="blue-gray">
                    Create item
                </Typography>
                <IconButton variant="text" color="blue-gray" onClick={() => setIsOpen(false)}>
                    <XMarkIcon className="w-4" />
                </IconButton>
            </div>
            <form className="flex flex-col gap-6 p-4" onSubmit={formik.handleSubmit}>
                <div className="grid gap-2">
                    <Input id="name" label="Name" value={formik.values.name} onChange={formik.handleChange} />
                    {formik.errors.name && (
                        <Typography variant="small" color="red">
                            {formik.errors.name}
                        </Typography>
                    )}
                </div>
                <div className="grid gap-2">
                    <Textarea id="description" rows={6} label="Description" value={formik.values.description} onChange={formik.handleChange} />
                    {formik.errors.description && (
                        <Typography variant="small" color="red">
                            {formik.errors.description}
                        </Typography>
                    )}
                </div>
                <div className="grid gap-2">
                    <Input id="price" label="Price" value={formik.values.price} onChange={formik.handleChange} />
                    {formik.errors.price && (
                        <Typography variant="small" color="red">
                            {formik.errors.price}
                        </Typography>
                    )}
                </div>
                <div className="grid gap-2">
                    <Select
                        size="lg"
                        value={formik.values.categoryId}
                        onChange={(value) => formik.setFieldValue("categoryId", value)}
                        label="Select category"
                        selected={(element) =>
                            element && React.cloneElement(element, {
                                className: "flex items-center px-0 gap-2 pointer-events-none",
                            })
                        }
                    >
                        {menu?.categories.map(({ name, _id }) => (
                            <Option key={_id} value={_id} className="flex items-center gap-2">
                                {name}
                            </Option>
                        ))}
                    </Select>
                    {formik.errors.categoryId && (
                        <Typography variant="small" color="red">
                            {formik.errors.categoryId}
                        </Typography>
                    )}
                </div>
                <ImageUploader {...{ setUploadedFileId }} />
                {uploadedFileId && <Image src={`/api/uploads/${uploadedFileId}`} alt="category-image" width={299} height={233} />}
                <Button type="submit" className="rounded-xl" disabled={isCreatingItem}>Create</Button>
            </form>
        </Drawer>
    );
}

export default MenuItemForm