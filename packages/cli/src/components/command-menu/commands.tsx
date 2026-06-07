import type { Command } from "./types";

export const COMMANDS : Command[] = [
    {
        name : "new",
        description : "start a new conversation",
        value : '/new'
    },
    {
        name : "exit",
        description : "exit from session",
        value : '/exit',
        action : (ctx) => ctx.exit()
    }
]