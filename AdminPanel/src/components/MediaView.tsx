import React from 'react';

type MediaViewProps = {image: string;video?: string;className?: string;playVideo?: boolean;};

export function MediaView({ image, video, className = '', playVideo = true }: MediaViewProps) {
  if (video && playVideo) {
    return <video src={video} poster={image || undefined} autoPlay muted loop playsInline className={className} />;
  }
  if (!image) return <div className={`${className} bg-ink`} />;
  return <img src={image} alt="" className={className} />;
}