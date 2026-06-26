/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { COURSES } from "@/data/courses";
import { PROJECT_SECTIONS } from "@/data/projectSec";
import { useScrollOrNavigate } from "@/hooks/useScrollOrNavigate";
import { skills } from "@/data/skills";
import Image from "next/image";

interface ProjectsProps {
  dict: Record<string, any>;
}

export default function Projects({ dict }: ProjectsProps) {
  return (
    <div
      id="projects"
      className="w-full flex justify-center py-6 px-8 max-[550px]:pt-20 max-[550px]:px-4 max-[550px]:pb-12"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-center gap-8">
        <h2 className="text-center font-eurostyle text-[2rem] font-medium pt-8 max-[680px]:pt-4">
          {dict.projects}
        </h2>

        <ProjectsSection dict={dict} />

        <h2 className="text-center font-eurostyle text-[2rem] font-medium pt-8 max-[680px]:pt-4">
          {dict.skills || "Skills"}
        </h2>

        <section className="flex flex-col gap-4">
          {Object.entries(skills).map(([k, v], i) => (
            <div key={`skill-section-${i}`} className="contents">
              <h1 className="font-eurostyle text-[1.2rem] font-medium pl-8">
                {dict[k] || k}
              </h1>

              <div className="grid grid-cols-6 gap-2 pb-6 max-[1200px]:grid-cols-5 max-[900px]:grid-cols-4 max-[680px]:grid-cols-3 max-[680px]:pb-2 max-[500px]:grid-cols-3 max-[430px]:grid-cols-2">
                {v.map((s, j) => (
                  <p
                    key={`skill-${j}-${i}`}
                    className="flex items-center h-12 text-[1rem] p-2 border border-(--grey-color-light) rounded-md cursor-pointer transition-[transform,border-color,box-shadow] duration-200 ease-in-out hover:-translate-y-0.75 hover:shadow-[0_14px_30px_var(--course-card-shadow)] hover:border-(--accent-color) max-[600px]:text-[0.85rem] max-[430px]:text-[0.8rem]"
                  >
                    {s}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>

        <h2 className="text-center font-eurostyle text-[2rem] font-medium pt-8 max-[680px]:pt-4">
          {dict.courses || "Courses"}
        </h2>

        <section className="flex flex-col gap-4">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 max-[700px]:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] max-[700px]:gap-3">
            {COURSES.map((c, i) => (
              <a
                key={i}
                target="_blank"
                href={c.url}
                className="relative flex flex-col rounded-lg overflow-hidden border border-(--grey-color-light) cursor-pointer transition-[transform,border-color,box-shadow] duration-200 ease-in-out hover:-translate-y-0.75 hover:shadow-[0_14px_30px_var(--course-card-shadow)] hover:border-(--accent-color)"
              >
                {/* Оновлений контейнер для зображення */}
                <div className="relative w-full aspect-square shrink-0">
                  <Image
                    src={c.image.startsWith("/") ? c.image : `/${c.image}`}
                    alt={c.name}
                    fill
                    sizes="(max-w-700px) 120px, 180px"
                    className="object-cover block"
                  />
                </div>

                <div className="flex flex-1 justify-between flex-col gap-[0.4rem] p-[0.75rem_0.85rem_0.9rem]">
                  <h3 className="text-[0.95rem] font-semibold text-(--main-color)">
                    {c.name}
                  </h3>
                  <p className="text-[0.75rem] opacity-80 text-(--grey-color)">
                    {c.hours} {dict.hours || "hours"}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ProjectsSection({ dict }: ProjectsProps) {
  const { scrollOrNavigate } = useScrollOrNavigate();
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [canScroll, setCanScroll] = useState<boolean[]>(() =>
    PROJECT_SECTIONS.map(() => false)
  );

  const checkSingleScrollability = useCallback((index: number) => {
    const el = scrollRefs.current[index];
    if (!el) return;

    const isScrollable = el.scrollWidth > el.clientWidth;
    setCanScroll((prev) => {
      if (prev[index] === isScrollable) return prev;
      const next = [...prev];
      next[index] = isScrollable;
      return next;
    });
  }, []);

  useEffect(() => {
    const observers: ResizeObserver[] = [];

    scrollRefs.current.forEach((el, index) => {
      if (!el) return;

      let frameId: number;
      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(() => {
          checkSingleScrollability(index);
        });
      });

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [checkSingleScrollability]);

  const handleScroll = (index: number, direction: "left" | "right") => {
    const container = scrollRefs.current[index];
    if (!container) return;

    const step = container.clientWidth * 0.8;
    const delta = direction === "left" ? -step : step;

    container.scrollTo({
      left: container.scrollLeft + delta,
      behavior: "smooth",
    });
  };

  const ArrowSvg = ({ className }: { className?: string }) => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        className="fill-(--reverse-color) transition-colors duration-200 group-hover/arrow:fill-white"
        d="M10.995 5.00409H3.40501L6.70501 1.71409C6.89332 1.52579 6.9991 1.27039 6.9991 1.00409C6.9991 0.73779 6.89332 0.482395 6.70501 0.294092C6.51671 0.105788 6.26132 0 5.99501 0C5.72871 0 5.47332 0.105788 5.28501 0.294092L0.285014 5.29409C0.193973 5.3892 0.122608 5.50134 0.0750135 5.62409C-0.0250045 5.86755 -0.0250045 6.14063 0.0750135 6.38409C0.122608 6.50684 0.193973 6.61899 0.285014 6.71409L5.28501 11.7141C5.37798 11.8078 5.48858 11.8822 5.61044 11.933C5.7323 11.9838 5.863 12.0099 5.99501 12.0099C6.12703 12.0099 6.25773 11.9838 6.37959 11.933C6.50145 11.8822 6.61205 11.8078 6.70501 11.7141C6.79874 11.6211 6.87314 11.5105 6.9239 11.3887C6.97467 11.2668 7.00081 11.1361 7.00081 11.0041C7.00081 10.8721 6.97467 10.7414 6.9239 10.6195C6.87314 10.4977 6.79874 10.3871 6.70501 10.2941L3.40501 7.00409H10.995C11.2602 7.00409 11.5146 6.89873 11.7021 6.7112C11.8897 6.52366 11.995 6.26931 11.995 6.00409C11.995 5.73888 11.8897 5.48452 11.7021 5.29699C11.5146 5.10945 11.2602 5.00409 10.995 5.00409Z"
      />
    </svg>
  );

  return PROJECT_SECTIONS.map((section, sectionIndex) => (
    <section key={section.name} className="flex flex-col gap-4">
      <h1 className="font-eurostyle text-[1.2rem] font-medium pl-8">
        {dict[section.name] || section.name}
      </h1>

      <div className="relative group/scroll">
        {canScroll[sectionIndex] && (
          <>
            <button
              onClick={() => handleScroll(sectionIndex, "left")}
              className="absolute left-2 top-2 rounded-full border border-(--grey-color) flex items-center justify-center cursor-pointer transition-[opacity,background-color] duration-200 ease-in-out opacity-0 pointer-events-none z-2 p-2 bg-(--main-color) hover:bg-(--accent-color) group-hover/scroll:opacity-100 group-hover/scroll:pointer-events-auto max-[900px]:opacity-100 max-[900px]:pointer-events-auto max-[900px]:p-[0.55rem] group/arrow"
            >
              <ArrowSvg className="w-4 h-4 max-[900px]:w-3 max-[900px]:h-3 rotate-0 origin-center" />
            </button>

            <button
              onClick={() => handleScroll(sectionIndex, "right")}
              className="absolute right-2 top-2 rounded-full border border-(--grey-color) flex items-center justify-center cursor-pointer transition-[opacity,background-color] duration-200 ease-in-out opacity-0 pointer-events-none z-2 p-2 bg-(--main-color) hover:bg-(--accent-color) group-hover/scroll:opacity-100 group-hover/scroll:pointer-events-auto max-[900px]:opacity-100 max-[900px]:pointer-events-auto max-[900px]:p-[0.55rem] group/arrow"
            >
              <ArrowSvg className="w-4 h-4 max-[900px]:w-3 max-[900px]:h-3 rotate-180 origin-center" />
            </button>
          </>
        )}

        <div
          ref={(el) => {
            scrollRefs.current[sectionIndex] = el;
          }}
          className="flex gap-3 overflow-x-auto scroll-smooth pb-2 max-[550px]:gap-2 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-(--grey-color-inv) [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          {section.projects.map((project, idx) => (
            <div
              onClick={() => scrollOrNavigate(project.url)}
              key={`${section.name}-${idx}`}
              className="group/card relative h-60 rounded-lg overflow-hidden cursor-pointer flex-[0_0_25rem] max-[900px]:flex-[0_0_14rem] max-[850px]:h-40 max-[550px]:flex-[0_0_11rem] max-[550px]:h-28"
            >
              <Image
                src={
                  project.thumbnailImage.startsWith("/")
                    ? project.thumbnailImage
                    : `/${project.thumbnailImage}`
                }
                alt={project.key}
                fill
                sizes="(max-w-550px) 11rem, (max-w-900px) 14rem, 25rem"
                className="object-cover"
                priority={sectionIndex === 0 && idx < 3}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-[1rem_1.5rem] opacity-0 transition-opacity duration-200 ease-in-out will-change-opacity group-hover/card:opacity-100 max-[900px]:opacity-100 z-1">
                <div className="flex flex-col gap-1 text-white">
                  <h2 className="text-[1.8rem] font-semibold max-[550px]:text-[1rem]">
                    {dict[project.key]?.label || project.key}
                  </h2>
                  <p className="text-[0.85rem] opacity-90 max-[550px]:text-[0.6rem]">
                    {dict[project.key]?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ));
}