import React, { useState } from "react";
import {
    Drawer,
    Button,
    Typography,
    IconButton,
    Input,
    Textarea,
} from "@material-tailwind/react";
import {
    XMarkIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";

import { useCreateCategory } from "../../hooks/api/useCategoryApi";
import { GraphQLError } from "graphql";
import { CategorySchema, CATEGORY_FORM_INITIAL_VALUES } from "./constants";
import { useFormik } from "formik";
import ImageUploader from "../../../components/image-uploader";


type CategoryFormProps = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CategoryForm: React.FC<CategoryFormProps> = ({ isOpen, setIsOpen }) => {
    const { mutate: createCategory, isLoading: isCreatingCategory } = useCreateCategory();
    const [uploadedFileId, setUploadedFileId] = useState<string>("")
    const formik = useFormik({
        initialValues: CATEGORY_FORM_INITIAL_VALUES,
        validationSchema: CategorySchema,
        validateOnMount: false,
        enableReinitialize: true,
        onSubmit: (values) => {
            createCategory({ input: { ...values, imageID: uploadedFileId } }, { onSuccess: () => console.log("success"), onError: (error) => console.log(error) })
        },
    });

    return (
        <Drawer open={isOpen} onClose={() => setIsOpen(false)} placement="right" overlay={false} className="overflow-auto">
            <div className="mb-2 flex items-center justify-between p-4">
                <Typography variant="h5" color="blue-gray">
                    Create category
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
                <ImageUploader {...{ setUploadedFileId }} />
                {uploadedFileId && <Image src={`/api/uploads/${uploadedFileId}`} alt="category-image" width={299} height={233} />}
                <Button type="submit" className="rounded-xl">Create</Button>
            </form>
        </Drawer >
    );
}

export default CategoryForm