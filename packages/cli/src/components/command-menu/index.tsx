import type { RefObject } from "react";
import { TextAttributes, type ScrollBoxRenderable } from "@opentui/core";
import { filterCommands } from "./filter-commands";
import { COMMANDS } from "./commands";


const MAX_COMMANDS_TO_SHOW = 8;

const COMMAND_COL_WIDTH = Math.max(...COMMANDS.map(cmd => cmd.name.length)) + 4;

type CommandMenuProps = {
    query : string;
    selectedIndex : number;
    scrollRef : RefObject<ScrollBoxRenderable> | null;
    onSelect : (index : number) => void;
    onExexute : (index : number) => void;
}

export function CommandMenu({query, selectedIndex, scrollRef, onSelect, onExexute} : CommandMenuProps){
    const filterCommand = filterCommands(query);
}