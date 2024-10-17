'use client'

import {motion} from 'framer-motion'
import React from "react";

interface AnimatedClockProps {
    size?: string
    color?: string
    hourHandDuration?: number
    minuteHandDuration?: number
}

export const AnimatedClock: React.FC<AnimatedClockProps> = ({
                                                                size = "w-20 h-20 sm:w-28 sm:h-28",
                                                                color = "currentColor",
                                                                hourHandDuration = 12,
                                                                minuteHandDuration = 600
                                                            }) => (
    <div className={`relative ${size} mx-auto`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke={color}
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <motion.line
                x1="12" y1="12"
                x2="12" y2="6"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                animate={{rotate: 360}}
                transition={{duration: hourHandDuration, repeat: Infinity, ease: "linear"}}
                style={{originX: "12px", originY: "12px"}}
            />
            <motion.polyline
                points="12,12 16,14"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                animate={{rotate: 360}}
                transition={{duration: minuteHandDuration, repeat: Infinity, ease: "linear"}}
                style={{originX: "12px", originY: "12px"}}
            />
        </svg>
    </div>
)