import type { RefObject } from "react";
import { TextAttributes, type ScrollBoxRenderable } from "@opentui/core";
import { filterCommands } from "./filter-commands";
import { COMMANDS } from "./commands";


const MAX_COMMANDS_TO_SHOW = 8;

const COMMAND_COL_WIDTH = Math.max(...COMMANDS.map(cmd => cmd.name.length)) + 4;

type CommandMenuProps = {
    query : string;
    selectedIndex : number;
    scrollRef : RefObject<ScrollBoxRenderable | null>;
    onSelect : (index : number) => void;
    onExexute : (index : number) => void;
}

export function CommandMenu({query, selectedIndex, scrollRef, onSelect, onExexute} : CommandMenuProps){
    const filtered = filterCommands(query);
    const visibleHeight = Math.min(filtered.length, MAX_COMMANDS_TO_SHOW);

    if(filtered.length === 0){
        return (
            <box paddingX={1}>
                <text attributes={TextAttributes.DIM}>No matching commands</text>
            </box>
        )
    }

    return (
        <scrollbox ref={scrollRef} height={visibleHeight} width="100%">
            {filtered.map((cmd, index) => {
                const isSelected = index === selectedIndex;
                return (
                    <box 
                        key={cmd.value}
                        flexDirection="row"
                        width="100%"
                        paddingX={1}
                        height={1}
                        overflow="hidden"
                        backgroundColor={isSelected ? "#89B4FA" : undefined}
                        onMouseMove={() => onSelect(index)}
                        onMouseDown={() => onExexute(index)}
                    >

                        <box width={COMMAND_COL_WIDTH} flexShrink={0}>
                            <text selectable={false} fg={isSelected ? "black" : "white"}>
                                /{cmd.name}
                            </text>
                        </box>
                         
                        <box flexGrow={1} flexShrink={1} minWidth={0}>
                            <text selectable={false} fg={isSelected ? "black" : "gray"}>
                                {cmd.description}
                            </text>
                        </box>
                            
                    </box>
                )
            } )}
        </scrollbox>
    )
}
