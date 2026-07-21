import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    x?: number;
    y?: number;
    as?: ElementType;
    className?: string;
}

export default function FadeIn({
    children,
    delay = 0,
    duration = 0.7,
    x = 0,
    y = 30,
    as: Tag = 'div',
    className,
}: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '50px', amount: 0 });

    const MotionTag = motion.create(Tag as 'div');

    return (
        <MotionTag
            ref={ref}
            className={className}
            initial={{ opacity: 0, x, y }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {children}
        </MotionTag>
    );
}
