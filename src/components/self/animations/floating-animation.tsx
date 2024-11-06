'use client'

import {motion} from 'framer-motion'
import {ReactNode} from 'react'

interface FloatingAnimationProps {
    children: ReactNode;
    className?: string;
}

export function FloatingAnimation({children, className}: FloatingAnimationProps) {
    return (
        <motion.div
            className={className}
            initial={{y: 0}}
            animate={{y: [-20, 0, -20]}}
            transition={{repeat: Infinity, duration: 6, ease: "easeInOut"}}
        >
            {children}
        </motion.div>
    )
}