'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Reset scroll position when route changes
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
