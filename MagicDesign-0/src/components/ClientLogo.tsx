import React from 'react';
import type { LogoStyle } from '../data/site';

type ClientLogoProps = {name: string;style: LogoStyle;light?: boolean;};

const styles: Record<LogoStyle, string> = {
  heavy: 'font-sans text-[28px] font-black tracking-tight uppercase',
  serif: 'font-serif text-[22px] tracking-wide',
  round: 'font-sans text-[26px] font-semibold lowercase',
  script: 'font-serif text-[24px] italic'
};

export function ClientLogo({ name, style, light = false }: ClientLogoProps) {
  return <span className={`${styles[style]} whitespace-nowrap leading-none ${light ? 'text-white' : 'text-ink'}`}>{name}</span>;
}