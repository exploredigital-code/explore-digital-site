'use client'

import { useState } from 'react'

interface Props {
  src: string
  thumbnail?: string
  aspect?: '9/16' | '16/9'
  label?: string
  placeholderClass?: string
}

export function VideoLightbox({ src, thumbnail, aspect = '9/16', label, placeholderClass }: Props) {
  const [playing, setPlaying] = useState(false)

  const aspectClass = aspect === '9/16' ? 'aspect-[9/16]' : 'aspect-video'

  if (playing) {
    return (
      <div className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden bg-black`}>
        <iframe
          src={src}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      aria-label={label ?? 'Assistir vídeo'}
      className="group relative w-full block focus:outline-none"
    >
      <div className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden ${placeholderClass ?? 'bg-g-dark'}`}>
        {thumbnail && (
          <img
            src={thumbnail}
            alt={label ?? 'thumbnail'}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300 shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="translate-x-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {label && (
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-[11px] text-menta-fraca tracking-widest uppercase truncate">{label}</p>
          </div>
        )}
      </div>
    </button>
  )
}
