import {useRef, useState, useMemo, type RefObject} from "react";
import { KeyEvent, ScrollBoxRenderable } from "@opentui/core";
import { useKeyboard } from "@opentui/react"; 
import { filterCommands } from "./filter-commands";
import type { Command } from "./types";
import { useKeyboardLayer } from "../../providers/keyboard-layer";

type useCommandMenuReturn = {
    ShowCommandMenu : boolean;
    commandQuery : string;
    SelectedIndex : number;
    scrollRef : RefObject<ScrollBoxRenderable | null>;
    handleContentChange : (txt:string) => void;
    resolveCommand : (index:number) => Command | undefined;
    setSelectedIndex : (index:number) => void;
}


export function useCommandMenu():useCommandMenuReturn {
    const [textValue,setTextValue] = useState('');
    const [SelectedIndex,setSelectedIndex] = useState(0);
    const [ShowCommandMenu,setShowCommandMenu] = useState(false);
    const scrollRef = useRef<ScrollBoxRenderable>(null);
    const {push,pop,isTopLayer} = useKeyboardLayer();

    const commandQuery = ShowCommandMenu && textValue.startsWith('/') ? textValue.slice(1) : "";

    const filteredCommands = useMemo(()=> filterCommands(commandQuery), [commandQuery]);

    const close = () => {
        setShowCommandMenu(false);
        pop("command");
    }

    const handleContentChange = (text:string) => {
        setTextValue(text);
        setSelectedIndex(0);

        const scrollBox = scrollRef.current;
        if (scrollBox) {
            scrollBox.scrollTo(0);
        }

        const prefix = text.startsWith("/") ? text.slice(1) : null;
        if (prefix !== null && !prefix.includes(" ")) {
            setShowCommandMenu(true);
            push("command", ()=> {
                close();
                return true;
            })
        } else {
            close();
        } 
    };

    const resolveCommand = (index:number): Command | undefined => {
        const command = filteredCommands[index];
        if (command) {
            close();
        }
        return command;
    }

     useKeyboard((key) => {
        if(!ShowCommandMenu || !isTopLayer("command")) return ;

        if(key.name === "escape") {
            key.preventDefault();
            setShowCommandMenu(false);
            pop("command")
        } else if (key.name === "up"){
            key.preventDefault();
            setSelectedIndex((i:number)=> {
                const newIndex = Math.max(0,i-1);

                const sb = scrollRef.current;
                if(sb && newIndex < sb.scrollTop){
                    sb.scrollTo(newIndex);
                }
                return newIndex;
            })
        }
        else if (key.name === "down") {
            key.preventDefault();
            setSelectedIndex((i:number)=> {
                if(filteredCommands.length === 0) {
                    return 0;
                }
                const newIndex = Math.min(filteredCommands.length -1 , i+1);
                const sb = scrollRef.current;

                if(sb){
                    const viewportHeight = sb.viewport.height;
                    const visibleEnd = sb.scrollTop + viewportHeight -1;

                    if(newIndex > visibleEnd) {
                        sb.scrollTo(newIndex - viewportHeight + 1);
                    }
                }
                return newIndex;
            })
        }
     })

    return {
    ShowCommandMenu,
    commandQuery,
    SelectedIndex,
    scrollRef,
    handleContentChange,
    resolveCommand,
    setSelectedIndex
    }
}