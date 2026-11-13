"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import CycleCover from "./covers/CycleCover";
import SplitCover from "./covers/SplitCover";
import KycImgCover from "./covers/KycImgCover";
import MetricCover from "./covers/MetricCover";
import type { Project } from "@/data/projects";

function WavyUnderline() {
  return (
    <svg
      viewBox="0 0 200 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[200px]"
      aria-hidden="true"
    >
      <path
        d="M2 4 C 20 1, 38 7, 56 4 S 92 1, 110 4 S 146 7, 164 4 S 190 1, 198 4"
        stroke="#b0aaf2"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function Cover({
  project,
  large,
  isHovered,
}: {
  project: Project;
  large: boolean;
  isHovered: boolean;
}) {
  const { cover } = project;
  const aspectRatio = large ? "16 / 8.2" : "16 / 9";

  return (
    <div
      className="relative w-full overflow-hidden rounded-t-[28px]"
      style={{ aspectRatio }}
    >
      {cover.type === "metric" && (
        <MetricCover before={cover.before} after={cover.after} icon={cover.icon} />
      )}

      {cover.type === "image" && (
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(max-width: 960px) 50vw, 33vw"
          className={[
            "object-cover transition-transform duration-500",
            isHovered ? "scale-[1.04]" : "",
            cover.objectPosition === "center"
              ? "object-center"
              : cover.objectPosition === "bottom"
                ? "object-bottom"
                : "object-top",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      )}

      {cover.type === "cycle" && (
        <CycleCover frame={cover.frame} images={cover.images} isHovered={isHovered} />
      )}

      {cover.type === "split" && (
        <SplitCover
          before={cover.before}
          after={cover.after}
          phone={cover.phone}
          isHovered={isHovered}
        />
      )}

      {cover.type === "kycimg" && (
        <KycImgCover src={cover.src} alt={cover.alt} isHovered={isHovered} />
      )}
    </div>
  );
}

interface Props {
  project: Project;
  large?: boolean;
}

export default function ProjectCard({ project, large = false }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { slug, category, title, descriptor, result, status, href } = project;
  const isPublished = status === "published";
  const internalHref = href ?? `/proyectos/${slug}`;
  const isExternal = !!href;

  const hoverHandlers = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onFocus: () => setIsHovered(true),
    onBlur: () => setIsHovered(false),
  };

  const content = (
    <div
      className={[
        "relative flex h-full flex-col overflow-hidden rounded-[28px] bg-white",
        "transition-[transform,box-shadow] duration-[250ms] ease-out",
        isHovered
          ? "-translate-y-1 shadow-[0_24px_50px_-20px_rgba(20,20,43,0.28)]"
          : "shadow-[0_2px_16px_rgba(0,0,0,0.06)]",
      ].join(" ")}
    >
      <Cover project={project} large={large} isHovered={isHovered} />

      {!isPublished && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-[14px] py-[6px] font-manrope text-[13px] font-semibold text-[#14142b]">
          Coming soon
        </span>
      )}

      <div className="flex flex-1 flex-col gap-[6px] px-8 py-7">
        <span className="font-manrope text-[14px] font-medium uppercase tracking-[0.08em] text-[#a99cf0]">
          {category}
        </span>

        <div className="flex flex-col gap-0.5">
          <h3 className="font-manrope text-[clamp(20px,2.3vw,28px)] font-bold leading-[1.2] tracking-[-0.01em] text-[#14142b]">
            {title}{" "}
            <em className="font-vollkorn font-medium not-italic italic text-[#a99cf0]">
              {descriptor}
            </em>
          </h3>
          {isPublished && (
            <div className="overflow-hidden transition-[max-height,opacity] duration-300 max-h-0 opacity-0 group-hover:max-h-[20px] group-hover:opacity-100">
              <WavyUnderline />
            </div>
          )}
        </div>

        <p className="mt-1 font-manrope text-[15px] leading-[1.5] text-[#5f5c85]">
          {result}
        </p>
      </div>
    </div>
  );

  if (!isPublished) {
    return (
      <div
        className="relative cursor-default opacity-[0.82] transition-opacity hover:opacity-100"
        {...hoverHandlers}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={internalHref}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group block h-full rounded-[28px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#8a7de0]"
      {...hoverHandlers}
    >
      {content}
    </Link>
  );
}
