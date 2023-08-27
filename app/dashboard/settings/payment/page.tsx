"use client"

import { Button, Input, Spinner, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { UpdateSettingsInput } from "generated/graphql";
import React from "react"
import { UseQueryResult } from "react-query";
import { toast } from "react-toastify";
import { useGetSettings, useUpdateSettings } from "../../../hooks/api/useSettingsApi";
import { renderSettingBreadcrumbs } from "../utils"
import { PaymentSchema, PAYMENT_SETTINGS_FORM_INITIAL_VALUES } from "./constants";

type PaymentSettings = {
    paymentApiKey: string;
    paymentApiSecret: string;
}

const PaymentSettings = () => {

    const { mutate: updateSettings, isLoading: isSubmitting } = useUpdateSettings();
    const { data: settings } = useGetSettings() as UseQueryResult<PaymentSettings>;

    const formik = useFormik({
        initialValues: !!settings ? settings : PAYMENT_SETTINGS_FORM_INITIAL_VALUES,
        validationSchema: PaymentSchema,
        validateOnBlur: false,
        validateOnMount: false,
        enableReinitialize: true,
        validateOnChange: false,
        onSubmit: (values: UpdateSettingsInput) => {
            updateSettings(
                { input: { ...values } },
                {
                    onSuccess: () => {
                        toast('Successfully updated',
                            {
                                hideProgressBar: true, autoClose: 2000,
                                type: 'success', position: 'top-right'
                            })
                    },
                    onError: (error: any) => {
                        toast(error,
                            {
                                hideProgressBar: true, autoClose: 2000,
                                type: 'error', position: 'top-right'
                            })
                    },
                },
            );
            return;


        },
    });
    return <div className="flex flex-col space-y-2 h-full">
        {renderSettingBreadcrumbs("Payment Settings")}

        <form onSubmit={formik.handleSubmit} className="flex h-full flex-col w-1/2 mt-4 justify-between">
            <div className="grid gap-2">
                <div className="grid gap-1 mt-10">
                    <Input
                        variant="static"
                        id="paymentApiKey"
                        label="API key"
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isSubmitting}
                        value={formik.values.paymentApiKey}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.paymentApiKey && (
                        <Typography variant="small" color="red">
                            {formik.errors.paymentApiKey}
                        </Typography>
                    )}
                </div>
                <div className="grid gap-1 mt-4">
                    <Input
                        variant="static"
                        label="API Secret"
                        id="paymentApiSecret"
                        type="password"
                        disabled={isSubmitting}
                        value={formik.values.paymentApiSecret}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.paymentApiSecret && (
                        <Typography variant="small" color="red">
                            {formik.errors.paymentApiSecret}
                        </Typography>
                    )}
                </div>
            </div>

            <Button disabled={isSubmitting} className="rounded-xl w-40 flex flex-row items-center space-x-4 justify-center" type="submit">
                Save
                {isSubmitting && <Spinner className="w-4 ml-4" />}
            </Button>
        </form>
    </div>
}

export default PaymentSettings;