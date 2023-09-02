"use client";

import { MagnifyingGlassIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    CardHeader,
    Chip,
    IconButton,
    Input,
    Tooltip,
} from "@material-tailwind/react";
import React from "react";
import { useFetchPayments } from "../../hooks/api/usePaymentsApi";
import { pick } from "ramda"

const TABLE_HEAD = ["ID", "Amount", "Status", "Contact", "Method"];


const Payments = () => {
    const { data: paymentData } = useFetchPayments();

    if (!paymentData) return null;

    const TABLE_ROWS = paymentData?.items.map(pick(["id", "amount", "status", "contact", "method"]));

    return <Card className="h-content w-[calc(100vw-350px)] mr-80 mb-20">
        <CardHeader floated={false} shadow={false} className="rounded-xl p-4 fixed z-10 top-20 w-[calc(100vw-350px)] bg-white shadow-md left-[305px]">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                <div>
                    <Typography variant="h5" color="blue-gray">
                        Transactions
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal" variant="small">
                        These are details about the last transactions
                    </Typography>
                </div>
                <div className="flex w-full shrink-0 gap-2 md:w-max">
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                    </div>
                    <Button className="flex items-center gap-3" size="sm">
                        <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
                    </Button>
                </div>
            </div>
        </CardHeader>
        <CardBody className="p-0">
            <table className="w-full min-w-max table-auto text-left overflow-y-scroll mt-[100px] mb-5">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="p-0">
                    {[...TABLE_ROWS, ...TABLE_ROWS].map(
                        (
                            {
                                id, amount, status, method, contact
                            }: any,
                            index: number,
                        ): any => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={id}>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {id}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {amount}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Chip
                                                size="sm"
                                                variant="ghost"
                                                value={status}
                                                color={
                                                    status === "captured"
                                                        ? "green"
                                                        : status === "pending"
                                                            ? "amber"
                                                            : "red"
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {contact}
                                        </Typography>
                                    </td>



                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                                                <Avatar
                                                    src={
                                                        method === "upi"
                                                            ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                                            : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                                                    }
                                                    size="sm"
                                                    alt={method}
                                                    variant="square"
                                                    className="h-full w-full object-contain p-1"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        },
                    )}
                </tbody>
            </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 fixed bottom-0 bg-white w-[calc(100vw-350px)]">
            <Button variant="outlined" size="sm">
                Previous
            </Button>
            <div className="flex items-center gap-2">
                <IconButton variant="outlined" size="sm">
                    1
                </IconButton>
                <IconButton variant="text" size="sm">
                    2
                </IconButton>
                <IconButton variant="text" size="sm">
                    3
                </IconButton>
                <IconButton variant="text" size="sm">
                    ...
                </IconButton>
                <IconButton variant="text" size="sm">
                    8
                </IconButton>
                <IconButton variant="text" size="sm">
                    9
                </IconButton>
                <IconButton variant="text" size="sm">
                    10
                </IconButton>
            </div>
            <Button variant="outlined" size="sm">
                Next
            </Button>
        </CardFooter>
    </Card>
}

export default Payments;
