import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
    text: string;
    className?: string;
}

interface CharProps {
    char: string;
    progress: MotionValue<number>;
    index: number;
    total: number;
}

function AnimatedChar({ char, progress, index, total }: CharProps) {
    const opacity = useTransform(progress, [index / total, (index + 1) / total], [0.2, 1]);
    return (
        <span className="relative inline-block whitespace-pre">
            <span className="invisible">{char}</span>
            <motion.span style={{ opacity }} className="absolute inset-0">
                {char}
            </motion.span>
        </span>
    );
}

export default function AnimatedText({ text, className = '' }: AnimatedTextProps) {
    const ref = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 0.8', 'end 0.2'],
    });

    const chars = text.split('');

    return (
        <p ref={ref} className={className}>
            {chars.map((char, i) => (
                <AnimatedChar
                    key={i}
                    char={char}
                    progress={scrollYProgress}
                    index={i}
                    total={chars.length}
                />
            ))}
        </p>
    );
}
