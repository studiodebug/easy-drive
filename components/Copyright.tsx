"use client";

import { useEffect, useState } from "react";

export function Copyright() {
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    if (!year) return null;

    return <span>© {year} Easy Drive. All rights reserved.</span>;
}
