import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

type Props = {
    animationData: unknown;
    loop?: boolean;
    autoplay?: boolean;
    className?: string;
    style?: React.CSSProperties;
};

export default function LottiePlayer({ animationData, loop = true, autoplay = true, className, style }: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const anim = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop,
            autoplay,
            // lottie expects a specific animation JSON structure, treat as unknown here
            animationData: animationData as object,
        });

        return () => anim.destroy();
    }, [animationData, loop, autoplay]);

    return <div ref={containerRef} className={className} style={style} />;
}
