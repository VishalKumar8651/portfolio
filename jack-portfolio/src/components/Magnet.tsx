import { useRef, useState, ReactNode } from 'react';

interface MagnetProps {
    children: ReactNode;
    padding?: number;
    strength?: number;
    activeTransition?: string;
    inactiveTransition?: string;
    className?: string;
}

export default function Magnet({
    children,
    padding = 150,
    strength = 3,
    activeTransition = 'transform 0.3s ease-out',
    inactiveTransition = 'transform 0.6s ease-in-out',
    className,
}: MagnetProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);
    const [transform, setTransform] = useState('translate3d(0,0,0)');

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;

        // Check if within padding
        const inZoneX = Math.abs(e.clientX - rect.left) >= 0 && e.clientX >= rect.left - padding && e.clientX <= rect.right + padding;
        const inZoneY = Math.abs(e.clientY - rect.top) >= 0 && e.clientY >= rect.top - padding && e.clientY <= rect.bottom + padding;

        if (inZoneX && inZoneY) {
            setIsActive(true);
            setTransform(`translate3d(${distX / strength}px, ${distY / strength}px, 0)`);
        } else {
            setIsActive(false);
            setTransform('translate3d(0,0,0)');
        }
    };

    const handleMouseLeave = () => {
        setIsActive(false);
        setTransform('translate3d(0,0,0)');
    };

    return (
        <div
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform,
                transition: isActive ? activeTransition : inactiveTransition,
                willChange: 'transform',
            }}
        >
            {children}
        </div>
    );
}
