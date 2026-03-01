"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right" | "none";
    delay?: number;
    className?: string;
    duration?: number;
}

export default function Reveal({
    children,
    direction = "up",
    delay = 0,
    className = "",
    duration = 0.5,
}: RevealProps) {
    const getVariants = () => {
        const variants = {
            hidden: {
                opacity: 0,
                x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
                y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
            },
            visible: {
                opacity: 1,
                x: 0,
                y: 0,
            },
        };
        return variants;
    };

    return (
        <motion.div
            variants={getVariants()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
