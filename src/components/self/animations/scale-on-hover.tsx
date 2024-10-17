'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface ScaleOnHoverProps {
    children: React.ReactNode;
    scale?: number;
}

export const ScaleOnHover: React.FC<ScaleOnHoverProps> = ({ children, scale = 1.08 }) => (
    <motion.div
        whileHover={{ scale: scale }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.3 }}
        style={{ display: 'inline-block' }}
    >
        {children}
    </motion.div>
);
