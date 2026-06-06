import { StatusBar } from "./status-bar";
import type { KeyBinding } from "@opentui/core";
type InputBarProps = {
    onSubmit: (text:string)=>void,
    disabled?: boolean
}

export const TEXTAREA_KEYBINDINGS:KeyBinding[] = [
    { name : "return", action: "submit" },
    { name : "enter", action: "submit" },
    { name : "return", shift: true, action: "newline" },
    { name : "enter", shift: true, action: "newline" }
]

export function Inputbar({onSubmit, disabled}:InputBarProps){
    return (
        <box width='100%' alignItems="center">
            <box borderColor="cyan" border={["left"]}>
                <box 
                  position="relative"
                  justifyContent="center"
                  backgroundColor={"1A1A24"}
                  paddingX={2}
                  paddingY={1}
                  gap={1}
                  width="100%">
                    <textarea focused={!disabled} 
                    keyBindings={TEXTAREA_KEYBINDINGS}
                      placeholder={"Ask me anything... find velnereblities in session management"}
                    />
                    <StatusBar/>
                </box>
            </box>
        </box>
    )
}