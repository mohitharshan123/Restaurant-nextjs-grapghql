"use client"

import React, { useCallback, useState } from "react";
import classnames from "classnames";
import { Stepper, Step, Option, Select, Card, CardBody, Typography } from "@material-tailwind/react";

const Tables = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const [noOfFloors, setNoOfFloors] = useState<string | undefined>("1")
  const [tableCount, setTableCount] = useState<{ [key: string]: string }>({});
  const [tablePositions, setTablePositions] = useState<{ [key: string]: Number[] }>({})

  const handleTableSelect = useCallback(
    (index: number) => {
      setTablePositions((current) => {
        const currentPositions = { ...current };

        if (currentPositions[activeStep]?.includes(index)) {
          currentPositions[activeStep] = currentPositions[activeStep].filter((number) => number !== index);
        } else {
          if (!currentPositions[activeStep]) currentPositions[activeStep] = [];

          if (Number(tableCount[activeStep]) > currentPositions[activeStep].length) {
            currentPositions[activeStep] = [...currentPositions[activeStep], index]
          }
        }
        return { ...currentPositions };
      });
    },
    [activeStep, tableCount]
  );

  return <div className="w-full py-4 px-8 flex flex-col space-y-4">
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
    <Stepper
      activeStep={activeStep}
    >{Array.from({ length: Number(noOfFloors) }, (_, index) => <Step className="cursor-pointer" key={index} onClick={() => setActiveStep(index)}>{index + 1}</Step>)}
    </Stepper>
    <Select
      size="md"
      label="Number of tables"
      value={tableCount[activeStep]}
      onChange={(value: string | undefined) => setTableCount(currentCounts => ({ ...currentCounts, [activeStep]: value }))}
      selected={(element) =>
        element && React.cloneElement(element, {
          className: "flex items-center px-0 gap-2 pointer-events-none",
        })
      }
    >{Array.from({ length: 40 }, (_, index) =>
      <Option key={index + 1} value={(index + 1).toString()} className="flex items-center gap-2">
        {index + 1}
      </Option>)}
    </Select>
    <Card className="w-3/4 h-full mx-auto">
      <CardBody className="h-full overflow-y-scroll justify-center items-center flex flex-col">
        <Typography variant="h4">Floor {activeStep + 1}</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-10 md:grid-cols-10 lg:grid-cols-10 gap-6 mt-10">
          {Array.from({ length: 80 }, (_, index) => <Card className="w-full h-full cursor-pointer">
            <CardBody onClick={() => handleTableSelect(index)} className={classnames("cursor-pointer h-10  rounded-xl", { "bg-green-200": tablePositions[activeStep]?.includes(index) })}>
            </CardBody>
          </Card>)}
        </div>
      </CardBody>
    </Card>
  </div>;
};

export default Tables;
