"use client"

import React, { useCallback, useEffect, useState } from "react";
import classnames from "classnames";
import { Stepper, Step, Option, Select, Card, CardBody, Typography, List, ListItem, ListItemPrefix, Button } from "@material-tailwind/react";
import { UseQueryResult } from "react-query";
import { useMyRestaurant, useUpdateFloorPlan } from "../../hooks/api/useRestaurantApi";

const Tables = () => {
  const [selectedFloor, setSelectedFloor] = useState<number>(1);

  const [noOfFloors, setNoOfFloors] = useState<string | undefined>("1")
  const [tableCount, setTableCount] = useState<{ [key: string]: string }>({});
  const [tablePositions, setTablePositions] = useState<{ [key: string]: Number[] }>({})

  const { data: restaurant } = useMyRestaurant() as UseQueryResult<{
    name: string;
    floorPlan: Record<string, number[]>
  }>;
  useEffect(() => {
    if (!restaurant?.floorPlan) return;
    setNoOfFloors(Math.max(...Object.keys(restaurant.floorPlan).map(Number)).toString())
    const transformedObject = Object.keys(restaurant.floorPlan).reduce((result: Record<string, string>, key: string) => {
      result[key] = restaurant.floorPlan[key].length.toString();
      return result;
    }, {});
    setTableCount(transformedObject)
    setTablePositions(restaurant?.floorPlan)
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

  return <div className="w-full py-4 flex flex-col space-y-4">

    <div className="flex flex-row items-center">
      <Card className="w-full max-w-[20rem] h-full space-y-2 p-2 shadow-xl shadow-blue-gray-900/5">
        <Select
          size="md"
          value={noOfFloors}
          label="Number of floors"
          onChange={(value: string | undefined) => setNoOfFloors(value)}
          selected={(element) =>
            element && React.cloneElement(element, {
              className: "flex items-center px-0 gap-2 pointer-events-none",
            })
          }
        >{Array.from({ length: 20 }, (_, index) =>
          <Option key={index + 1} value={(index + 1).toString()} className="flex items-center gap-2">
            {index + 1}
          </Option>)}
        </Select>
        <Select
          size="md"
          label="Number of tables"
          value={tableCount[selectedFloor]}
          onChange={(value: string | undefined) => setTableCount(currentCounts => ({ ...currentCounts, [selectedFloor]: value }))}
          selected={(element) =>
            element && React.cloneElement(element, {
              className: "flex items-center px-0 gap-2 pointer-events-none",
            })
          }
        >{Array.from({ length: 40 }, (_, index) =>
          <Option key={index + 1} value={(index + 1).toString()} className="items-center gap-2">
            {index + 1}
          </Option>)}
        </Select>
        <List>
          <div className="overflow-scroll h-full space-y-2 max-h-[50vh] min-h-[50vh]">
            {Array.from({ length: Number(noOfFloors) }, (_, index) =>
              <ListItem className={classnames("h-full rounded-xl", { "bg-gray-300": selectedFloor === index + 1 })} onClick={() => setSelectedFloor(index + 1)}>
                <Typography className="cursor-pointer" key={index}>Floor {index + 1}
                </Typography>
              </ListItem>
            )}</div>
        </List>
        <Button disabled={isUpdatingFloorPlan} className="rounded-xl" onClick={() => updateFloorPlan({ newFloorPlan: tablePositions })}>Update floor plan</Button>
      </Card>
      <div className="w-3/4 h-full">
        <CardBody className="h-full overflow-y-scroll justify-center items-center flex flex-col">
          <Typography variant="h3" className="text-gray-600">Floor {selectedFloor}</Typography>
          <div className="grid grid-cols-1 sm:grid-cols-10 md:grid-cols-10 lg:grid-cols-10 gap-6 mt-10">
            {Array.from({ length: 80 }, (_, index) => <Card className="w-full h-full cursor-pointer">
              <CardBody onClick={() => handleTableSelect(index)} className={classnames("cursor-pointer h-10  rounded-xl", { "bg-green-200": tablePositions[selectedFloor]?.includes(index) })}>
              </CardBody>
            </Card>)}
          </div>
        </CardBody>
      </div>
    </div>
  </div>;
};

export default Tables;
