import { SVGProps } from "react";

export function Logo({ ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg width="160" height="56" viewBox="0 10 215 56" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <text x="0" y="55" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="900" fill="#000" letterSpacing="-2">
                Easy
            </text>
            <text x="100" y="55" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="900" fill="#000" letterSpacing="-2">
                Drive
            </text>
            <rect x="0" y="60" width="80" height="6" fill="#ffdb33" rx="3" />
        </svg>
    );
}