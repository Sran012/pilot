import type { Command } from "./types";

export const COMMANDS: Command[] = [
    {
        name: "new",
        description: "start a new conversation",
        value: '/new'
    },
    {
        name: "login",
        description: "Sign in with your browser",
        value: "/login",
    },
    {
        name: "logout",
        description: "Sign out of your account",
        value: "/logout",
    },
    {
        name: "upgrade",
        description: "Buy more credits",
        value: "/upgrade",
    },
    {
        name: "usage",
        description: "Open billing portal in your browser",
        value: "/usage",
    },
    {
        name: "exit",
        description: "exit from session",
        value: '/exit',
        action: (ctx) => ctx.exit()
    },
]