import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import {
  PlusIcon,
} from "@heroicons/react/24/outline";
import { ActionItem } from "../app/dashboard/menu/utils";

const Actions = ({ actions }: { actions: ActionItem[] }) => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute bottom-10 right-8">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent>
            {actions.map(({ label, action, icon: Icon }: ActionItem) => <SpeedDialAction className="h-16 w-16">
              <div onClick={action} className="flex flex-col items-center justify-center p-10">
                <Icon className="w-4" />
                <Typography color="blue-gray" className="text-xs font-normal">
                  {label}
                </Typography>
              </div>
            </SpeedDialAction>)
            }
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
  );
};

export default Actions;
