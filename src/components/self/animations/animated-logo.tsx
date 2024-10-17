'use client'

import {motion} from 'framer-motion'
import {Zap} from 'lucide-react'
import React from "react";

interface AnimatedLogoProps {
    text: string
    delay?: number
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({text, delay = 1}) => (
    <motion.div
        className="absolute top-4 left-4 text-black/50 flex items-center"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: delay}}
    >
        <Zap className="mr-2 h-5 w-5 sm:h-6 sm:w-6"/>
        <span className="text-sm sm:text-base">{text}</span>
    </motion.div>
)