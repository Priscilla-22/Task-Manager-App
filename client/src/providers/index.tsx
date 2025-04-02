"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { store } from "@/store/store";
import { Provider as ReduxProvider } from "react-redux";
import QueryProvider from "./QueryProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ReduxProvider store={store}>
        <QueryProvider>
            <ThemeProvider
                attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    >
    {children}
    </ThemeProvider>
    </QueryProvider>
    </ReduxProvider>
    </SessionProvider>
);
}