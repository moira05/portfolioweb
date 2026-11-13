"use client";

import { useRef } from "react";
import SectionTitle from "./SectionTitle";

const videos = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
  "/videos/video4.mp4",
];

function VideoCard({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="overflow-hidden rounded-[20px]"
      onMouseEnter={() => ref.current?.pause()}
      onMouseLeave={() => ref.current?.play()}
    >
      <video
        ref={ref}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default function Playground() {
  return (
    <section className="bg-[#eeedf5] px-10 py-16">
      <div className="mx-auto max-w-screen-xl">
        <SectionTitle>Playground</SectionTitle>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {videos.map((src) => (
            <VideoCard key={src} src={src} />
          ))}
        </div>
      </div>
    </section>
  );
}
