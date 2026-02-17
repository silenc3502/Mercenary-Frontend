'use client';
import { useEffect } from 'react';

export default function SpaPageView() {
    useEffect(() => {
        window.dataLayer?.push({
            event: 'page_view',
            page_path: window.location.pathname,
            page_location: window.location.href,
        });
    }, []);

    return null; // UI는 없음, 이벤트만 전송
}
