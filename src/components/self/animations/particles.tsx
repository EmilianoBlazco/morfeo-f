'use client'

import {useEffect, useState} from 'react'
import {motion} from 'framer-motion'

interface ParticleProps {
    x: number
    y: number
}

const Particle = ({x, y}: ParticleProps) => (
    <motion.div
        className="absolute bg-black rounded-full w-1 h-1"
        style={{left: x, top: y}}
        animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
        }}
        transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            repeatType: 'loop'
        }}
    />
)

export default function Particles() {
    const [particles, setParticles] = useState<{ x: number, y: number }[]>([])

    useEffect(() => {
        const particlesArray = Array.from({length: 20}, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
        }));

        setParticles(particlesArray);
    }, [])

    return (
        <>
            {particles.map((particle, index) => (
                <Particle key={index} x={particle.x} y={particle.y}/>
            ))}
        </>
    )
}