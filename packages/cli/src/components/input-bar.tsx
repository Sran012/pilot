import { useEffect,useRef,useCallback } from "react";
import type { TextareaRenderable } from "@opentui/core";
import { useRenderer } from "@opentui/react";
import { CommandMenu } from "./command-menu";
import { StatusBar } from "./status-bar";
import type { KeyBinding } from "@opentui/core";

import type { Command } from "./command-menu/types";
import { useCommandMenu } from "./command-menu/use-command-menu";

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
    const textareaRef = useRef<TextareaRenderable>(null);
    const onSubmitRef = useRef<() => void>(() => {});
    const renderer = useRenderer();

    const {
        ShowCommandMenu,
        commandQuery,
        SelectedIndex,
        scrollRef,
        handleContentChange,
        resolveCommand,
        setSelectedIndex
    } = useCommandMenu();

    const handleTextareaContentChange = useCallback(()=> {
        const textarea = textareaRef.current;
        if (!textarea) return;

        handleContentChange(textarea.plainText);
    },[])

    const handleCommand = useCallback((command:Command |undefined)=> {
        const textarea = textareaRef.current;
        if(!textarea || !command) return;

        textarea.setText("");

        if(command.action){
            command.action({
                exit: ()=> renderer.destroy(),
            })    
        }
        else {
            textarea.insertText(command.value + " ");
        }
    }, []);

    const handleCommandExecute = useCallback((index:number)=> {
        const command = resolveCommand(index);
        handleCommand(command);
    },[resolveCommand,handleCommand])

    const handleSubmit = useCallback(()=>{
        if (disabled) return;

        const textarea = textareaRef.current;
        if(!textarea) return;

        const text = textarea.plainText.trim();
        if(text.length === 0) return;

        onSubmit(text);
        textarea.setText("");
    }, []);

    useEffect(()=> {
        const textarea = textareaRef.current;
        if(!textarea) return;

        textarea.onSubmit = ()=> {
            onSubmitRef.current();
        }
    }, []);

    onSubmitRef.current = ()=>{
        if(disabled) return;

        if(ShowCommandMenu){
            const command = resolveCommand(SelectedIndex);
            handleCommand(command);
            return;
        }

        handleSubmit();
    }

    return (
        <box width='100%' alignItems="center">
            <box width="100%" borderColor="cyan" border={["left"]}>
                <box 
                  position="relative"
                  justifyContent="center"
                  backgroundColor={"1A1A24"}
                  paddingX={2}
                  paddingY={1}
                  gap={1}
                  width="100%">
                    {ShowCommandMenu && (<box position="absolute" width='100%' bottom="100%" left={0} backgroundColor="#1A1A24" zIndex={10}>
                        <CommandMenu query={commandQuery}
                        selectedIndex={SelectedIndex}
                        scrollRef={scrollRef}
                        onSelect={setSelectedIndex}
                        onExexute={handleCommandExecute}/>
                    </box>)}
                    <textarea focused={!disabled} 
                    ref={textareaRef }
                    width="100%"
                    onContentChange={handleTextareaContentChange}
                    keyBindings={TEXTAREA_KEYBINDINGS}
                      placeholder={"Ask me anything... find velnereblities in session management"}
                    />
                    <StatusBar/>
                </box>
            </box>
        </box>
    )
}
