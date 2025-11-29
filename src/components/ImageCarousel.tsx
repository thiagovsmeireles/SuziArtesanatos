"use client";
import { useState } from "react";

export default function ImageCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return <div className="aspect-square w-full rounded bg-gray-100" />;
  const go = (dir: number) => setIdx((i) => (i + dir + images.length) % images.length);
  return (
    <div className="relative">
      <img src={images[idx]} alt="" className="aspect-square w-full rounded object-cover" />
      <button className="btn-secondary absolute left-2 top-1/2 -translate-y-1/2 rounded px-2 py-1" onClick={() => go(-1)}>
        ◀
      </button>
      <button className="btn-secondary absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1" onClick={() => go(1)}>
        ▶
      </button>
      <div className="mt-2 grid grid-cols-5 gap-2">
        {images.slice(0, 5).map((img, i) => (
          <button key={img} onClick={() => setIdx(i)} className={"rounded " + (i === idx ? "ring-2 ring-brand-purple" : "")}>
            <img src={img} alt="" className="aspect-square w-full rounded object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}