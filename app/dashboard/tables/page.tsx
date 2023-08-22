"use client"

import React, { useCallback, useEffect, useState } from "react";
import classnames from "classnames";
import { Stepper, Step, Option, Select, Card, CardBody, Typography, List, ListItem, ListItemPrefix, Button, Drawer } from "@material-tailwind/react";
import { UseQueryResult } from "react-query";
import { useQRCode } from 'next-qrcode';

import { useMyRestaurant, useUpdateFloorPlan } from "../../hooks/api/useRestaurantApi";
import LeftBar from "./left-bar";

const Tables = () => {
  const [selectedFloor, setSelectedFloor] = useState<number>(1);

  const [noOfFloors, setNoOfFloors] = useState<string | undefined>("1")
  const [tableCount, setTableCount] = useState<{ [key: string]: string }>({});
  const [tablePositions, setTablePositions] = useState<{ [key: string]: Number[] }>({})
  const [isQRDrawerOpen, setIsQRDrawerOpen] = useState<boolean>(false)

  const { data: restaurant } = useMyRestaurant() as UseQueryResult<{
    name: string;
    floorPlan: Record<string, number[]>
  }>;

  const { Canvas } = useQRCode();


  useEffect(() => {
    if (!restaurant?.floorPlan) return;

    const handleTablePositions = () => {
      setNoOfFloors(Math.max(...Object.keys(restaurant.floorPlan).map(Number)).toString())
      const transformedObject = Object.keys(restaurant.floorPlan).reduce((result: Record<string, string>, key: string) => {
        result[key] = restaurant.floorPlan[key].length.toString();
        return result;
      }, {});
      setTableCount(transformedObject)
      setTablePositions(restaurant?.floorPlan)
    }

    handleTablePositions();

  }, [restaurant?.floorPlan])


  const { mutate: updateFloorPlan, isLoading: isUpdatingFloorPlan } = useUpdateFloorPlan();

  const handleTableSelect = useCallback(
    (index: number) => {
      setTablePositions((current) => {
        const currentPositions = { ...current };

        if (currentPositions[selectedFloor]?.includes(index)) {
          currentPositions[selectedFloor] = currentPositions[selectedFloor].filter((number) => number !== index);
        } else {
          if (!currentPositions[selectedFloor]) currentPositions[selectedFloor] = [];

          if (Number(tableCount[selectedFloor]) > currentPositions[selectedFloor].length) {
            currentPositions[selectedFloor] = [...currentPositions[selectedFloor], index]
          }
        }
        return { ...currentPositions };
      });
    },
    [selectedFloor, tableCount]
  );

  const handlePrint = (tableNumber: number) => {
    const bodyElement = document.getElementsByTagName('body')[0];
    if (!bodyElement) return;
    const printArea = document.getElementById(`qr-print-${tableNumber}`)
    const allPrintAreas = document.querySelectorAll('[id^="qr-print-"]');
    allPrintAreas.forEach((printArea) => {
      printArea.setAttribute("style", "visibility: hidden;");
    });
    printArea?.setAttribute("style", "visibility: visible; position: fixed; top: 5px;");
    bodyElement.classList.add('printing');
    window.print();
    bodyElement.classList.remove('printing');
    allPrintAreas.forEach((printArea) => {
      printArea.setAttribute("style", "visibility: visible;");
    });
  }

  const leftBarProps = {
    noOfFloors, setNoOfFloors, tableCount, setTableCount,
    selectedFloor, setSelectedFloor, updateFloorPlan,
    isUpdatingFloorPlan, tablePositions, setIsQRDrawerOpen
  }

  return <><div className="w-full py-4 flex flex-col space-y-4">
    <div className="flex flex-row items-center">
      <LeftBar {...leftBarProps} />
      <div className="w-3/4 h-full">
        <CardBody className="h-full overflow-y-scroll justify-center items-center flex flex-col">
          <Typography variant="h3" className="text-gray-600">Floor {selectedFloor}</Typography>
          <div className="grid grid-cols-1 sm:grid-cols-10 md:grid-cols-10 lg:grid-cols-10 gap-6 mt-10">
            {Array.from({ length: 80 }, (_, index) => <Card className="w-full h-full cursor-pointer">
              <CardBody onClick={() => handleTableSelect(index)} className={classnames("cursor-pointer h-10 items-center justify-center flex rounded-xl", { "bg-green-200": tablePositions[selectedFloor]?.includes(index) })}>
                {index + 1}
              </CardBody>
            </Card>)}
          </div>
        </CardBody>
      </div>
    </div>
  </div>
    <Drawer placement="right" open={isQRDrawerOpen} onClose={() => setIsQRDrawerOpen(false)} overlay={false} className="overflow-auto p-4 items-center flex flex-col space-y-10">
      {tablePositions[selectedFloor]?.map((tableNumber: any) => (<div className="flex items-center flex-col">
        <div className="flex items-center flex-col p-10 bg-amber-200 rounded-xl m-2" id={`qr-print-${tableNumber}`}>
          <Typography variant="h3">{restaurant?.name}</Typography>
          <Typography variant="h6">{`Table ${tableNumber + 1}`}</Typography>
          <Canvas
            text={`https://www.dine.com/${restaurant?.name}/guest/table/{tableNumber}`}
            options={{
              errorCorrectionLevel: 'M',
              margin: 3,
              scale: 4,
              width: 200,
              color: {
                dark: "#000000",
                light: "#FFFFFF",
              },
            }}
          /></div><Button className="rounded-xl" onClick={() => handlePrint(tableNumber)}>Print</Button></div>
      ))}
    </Drawer>
  </>;
};

export default Tables;
