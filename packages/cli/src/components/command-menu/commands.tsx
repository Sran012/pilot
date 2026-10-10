import { ThemeDialogContent } from "../dialogs";
import type { Command } from "./types";

export const COMMANDS: Command[] = [
    {
        name: "new",
        description: "start a new conversation",
        value: '/new',
        action : (ctx) => {
            ctx.toast.show({ message : "starting a new conversation"})
        }
    },
    {
        name: "login",
        description: "Sign in with your browser",
        value: "/login",
        action : (ctx) => {
            ctx.toast.show({ message : "log in !!"})
        }
    },
    {
        name: "logout",
        description: "Sign out of your account",
        value: "/logout",
        action : (ctx) => {
            ctx.toast.show({ message : "logging out !!"})
        }
    },
    {
        name: "upgrade",
        description: "Buy more credits",
        value: "/upgrade",
        action : (ctx) => {
            ctx.toast.show({ message : "upgrade the plan !1"})
        }
    },
    {
        name: "usage",
        description: "Open billing portal in your browser",
        value: "/usage",
        action : (ctx) => {
            ctx.toast.show({ message : "token used info "})
        }
    },
    {
        name: "theme",
        description: "Change the theme",
        value: '/theme',
        action: (ctx) => {
            ctx.dialog.open({
                title : "select theme",
                children : <ThemeDialogContent/>
            })
        }
    },
    {
        name: "exit",
        description: "exit from session",
        value: '/exit',
        action: (ctx) => ctx.exit()
    },
]