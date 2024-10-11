import {motion} from "framer-motion";
import {FC, ReactNode} from "react";

interface AnimatedWrapperProps {
    children: ReactNode;
    initialX?: number;
    exitX?: number;
    duration?: number;
}


const AnimatedWrapper: FC<AnimatedWrapperProps> = ({children, initialX = 0, exitX = 0, duration = 1}) => {
    return (
        <motion.div
            initial={{opacity: 0, x: initialX}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: exitX}}
            transition={{duration}}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedWrapper;
