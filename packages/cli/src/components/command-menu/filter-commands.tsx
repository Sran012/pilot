import { COMMANDS } from "./commands";
import type { Command } from "./types";

export function filterCommands(query:string) : Command[]{
    if(!query.startsWith('/')) return [];
    const searchTerm = query.slice(1).toLowerCase();
    return COMMANDS.filter(cmd => cmd.name.toLowerCase().startsWith(searchTerm));
}