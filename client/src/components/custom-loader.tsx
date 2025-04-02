"use client";

import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function CustomLoader() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center p-8 gap-4"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
                <Loader2 className="h-8 w-8 text-primary" />
            </motion.div>
            <motion.p
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
                className="text-sm text-muted-foreground"
            >
                Loading your tasks...
            </motion.p>
        </motion.div>
    );
}