"use client";

import Image from "next/image";
import { useState } from "react";

export default function Slot({
  label,
  note,
  src,
  alt,
  className = "",
}: {
  label: string;
  note?: string;
  src?: string | string[];
  alt?: string;
  className?: string;
}) {
  const images = Array.isArray(src) ? src : src ? [src] : [];

  if (images.length > 1) {
    return <Carousel images={images} alt={alt ?? label} className={className} />;
  }

  if (images.length === 1) {
    return (
      <div className={`slot slot-image ${className}`}>
        <Image src={images[0]} alt={alt ?? label} fill style={{ objectFit: "cover" }} />
      </div>
    );
  }

  return (
    <div className={`slot ${className}`}>
      <span className="slot-label">{label}</span>
      {note && <span className="slot-note">{note}</span>}
    </div>
  );
}

function Carousel({
  images,
  alt,
  className,
}: {
  images: string[];
  alt: string;
  className: string;
}) {
  const [index, setIndex] = useState(0);
  const go = (delta: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + delta + images.length) % images.length);
  };

  return (
    <div className={`slot slot-image slot-carousel ${className}`}>
      <Image src={images[index]} alt={`${alt} ${index + 1} of ${images.length}`} fill style={{ objectFit: "cover" }} />
      <button type="button" className="carousel-btn carousel-prev" onClick={(e) => go(-1, e)} aria-label="Previous image">
        ‹
      </button>
      <button type="button" className="carousel-btn carousel-next" onClick={(e) => go(1, e)} aria-label="Next image">
        ›
      </button>
      <div className="carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`carousel-dot ${i === index ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIndex(i);
            }}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
