import React from 'react';
import { useContent } from '../contexts/ContentContext';

type LogoProps = {light?: boolean;};

export function Logo({ light = false }: LogoProps) {
  const { brandName } = useContent().content.settings;
  return (
    <a
      href="#top"
      aria-label={`${brandName} home`}
      className={`text-[30px] font-bold leading-none tracking-tight ${light ? 'text-white' : 'text-brand'}`}>
      
      {brandName}
    </a>);

}