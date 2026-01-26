import { SVGProps } from "react";

export function Logo({ ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg width="160" height="56" viewBox="0 10 215 56" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <text x="0" y="55" font-family="Arial, sans-serif" font-size="48" font-weight="900" fill="#000" letter-spacing="-2">
                Easy
            </text>
            <text x="100" y="55" font-family="Arial, sans-serif" font-size="48" font-weight="900" fill="#000" letter-spacing="-2">
                Drive
            </text>
            <rect x="0" y="60" width="80" height="6" fill="#ffdb33" rx="3" />
        </svg>
    );
}