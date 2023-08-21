"use client"

import React, { useCallback, useState } from "react";
import classnames from "classnames";
import { Stepper, Step, Option, Select, Card, CardBody, Typography, List, ListItem, ListItemPrefix } from "@material-tailwind/react";

const Tables = () => {
  const [selectedFloor, setSelectedFloor] = useState<number>(0);

  const [noOfFloors, setNoOfFloors] = useState<string | undefined>("1")
  const [tableCount, setTableCount] = useState<{ [key: string]: string }>({});
  const [tablePositions, setTablePositions] = useState<{ [key: string]: Number[] }>({})

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
    <Select
      size="md"
      defaultValue="1"
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
    <div className="flex flex-row items-center">
      <Card className="w-full max-w-[20rem] h-full p-4 shadow-xl shadow-blue-gray-900/5">
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
          <div className="overflow-scroll h-full max-h-[50vh] min-h-[50vh]">
            {Array.from({ length: Number(noOfFloors) }, (_, index) =>
              <ListItem className={classnames("h-full rounded-xl", { "bg-gray-300": selectedFloor === index })} onClick={() => setSelectedFloor(index)}>
                <Typography className="cursor-pointer" key={index}>Floor {index + 1}
                </Typography>
              </ListItem>
            )}</div>
        </List>
      </Card>
      <div className="w-3/4 h-full">
        <CardBody className="h-full overflow-y-scroll justify-center items-center flex flex-col">
          <Typography variant="h3" className="text-gray-600">Floor {selectedFloor + 1}</Typography>
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
