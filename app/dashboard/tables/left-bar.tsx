import { Stepper, Step, Option, Select, Card, CardBody, Typography, List, ListItem, ListItemPrefix, Button } from "@material-tailwind/react";
import classnames from "classnames";
import React from "react";

type LeftBarProps = {
    noOfFloors: string | undefined,
    setNoOfFloors: React.Dispatch<React.SetStateAction<string | undefined>>,
    tableCount: { [key: string]: string },
    setTableCount: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>,
    selectedFloor: number,
    setSelectedFloor: React.Dispatch<React.SetStateAction<number>>,
    updateFloorPlan: ({ newFloorPlan }: { newFloorPlan: { [key: string]: Number[] } }) => void,
    isUpdatingFloorPlan: boolean,
    tablePositions: { [key: string]: Number[] },
    setIsQRDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LeftBar: React.FC<LeftBarProps> = (
    { noOfFloors, setNoOfFloors, tableCount, setTableCount,
        selectedFloor, setSelectedFloor, updateFloorPlan,
        isUpdatingFloorPlan, tablePositions, setIsQRDrawerOpen }
) =>
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
        <Button className="rounded-xl" onClick={() => setIsQRDrawerOpen(true)}>Print QR Scanner</Button>
    </Card>


export default LeftBar