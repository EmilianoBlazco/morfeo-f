'use client'

import {motion} from 'framer-motion'
import React from 'react'

interface FadeInAnimationProps {
    children: React.ReactNode
    delay?: number
    duration?: number
    initialY?: number
}

export const FadeInAnimation: React.FC<FadeInAnimationProps> = ({
                                                                    children,
                                                                    delay = 0,
                                                                    duration = 0.6,
                                                                    initialY = 0
                                                                }) => (
    <motion.div
        initial={{opacity: 0, y: initialY}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: duration, delay: delay}}
    >
        {children}
    </motion.div>
)