import type { ToastContextValue } from "../../providers/toast";
import type { DialogContextValue } from "../../providers/dialog";
export type commandContext = {
    exit : () => void;
    toast : ToastContextValue;
    dialog: DialogContextValue;
}

export type Command = {
    name : string,
    description : string,
    value : string,
    action? : (context:commandContext) => void
}


