import { useState, useEffect } from 'react';

const SCREEN_SIZES: Record<string, number> = {
    xs: 640,
    sm: 768,
    md: 1024,
    lg: 1280,
    xl: 1536,
};

const useScreenSize = (): ((...sizes: string[]) => boolean) => {
    const [screenSize, setScreenSize] = useState<string | null>(null);

    useEffect(() => {
        function detectScreenSize() {
            const width = window.innerWidth;

            if (!width) return;
            for (const [size, minWidth] of Object.entries(SCREEN_SIZES)) {
                if (width < minWidth) {
                    setScreenSize(size);
                    return;
                }
            }

            setScreenSize('xl');
        }

        detectScreenSize();

        function handleResize() {
            detectScreenSize();
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (...sizes: string[]) => sizes.some(size => size === screenSize);
};

export default useScreenSize;
