import React from 'react';
import { brandName } from '../data/site';

type LogoProps = { light?: boolean };

export function Logo({ light = false }: LogoProps) {
  return (
    <a
      href="#top"
      aria-label={`${brandName} home`}
      className={`inline-flex items-start text-[32px] font-bold leading-none tracking-[-0.03em] ${
        light ? 'text-white' : 'text-brand'
      }`}
    >
      <span>{brandName}</span>
      <svg
        width="7"
        height="7"
        viewBox="0 0 8 8"
        fill="none"
        aria-hidden="true"
        className="ml-0.5 mt-0.5 shrink-0"
      >
        <path
          d="M1.5 6.5L6.5 1.5M6.5 1.5H2M6.5 1.5V6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
