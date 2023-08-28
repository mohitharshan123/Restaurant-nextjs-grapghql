import { Typography, Button, Drawer } from "@material-tailwind/react";
import { Restaurant } from "main/restaurant/restaurant.schema";
import { useQRCode } from "next-qrcode";

type QRDrawerProps = {
    isQRDrawerOpen: boolean;
    setIsQRDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    restaurant: {
        name: string | undefined;
        floorPlan: Record<string, number[]> | undefined;
    };
    tablePositions: { [key: string]: Number[] };
    selectedFloor: number;
}

const QRDrawer: React.FC<QRDrawerProps> = ({ isQRDrawerOpen, setIsQRDrawerOpen, restaurant, tablePositions, selectedFloor }) => {
    const { Canvas } = useQRCode();

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

    return <Drawer size={400} placement="right" open={isQRDrawerOpen} onClose={() => setIsQRDrawerOpen(false)} overlay={false} className="overflow-auto p-4 items-center flex flex-col space-y-10">
        {tablePositions[selectedFloor]?.map((tableNumber: any) => (<div className="flex items-center flex-col">
            <div className="flex items-center flex-col p-10 bg-amber-200 rounded-xl m-2" id={`qr-print-${tableNumber}`}>
                <Typography variant="h3">{restaurant?.name}</Typography>
                <Typography variant="h6">{`Table ${tableNumber + 1}`}</Typography>
                <Canvas
                    text={`https://www.dine.com/${restaurant?.name}/table/${tableNumber + 1}`}
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
}

export default QRDrawer;