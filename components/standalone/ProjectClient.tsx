/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import { useScrollOrNavigate } from "@/hooks/useScrollOrNavigate";

export interface Project {
  name: string;
  description: string;
  skills: string[];
  solo: boolean;
  url: string | false;
  thumbnail: string;
  images: string[];
  durationMonths: number;
  isSolo: boolean;
  isDesigned: boolean;
  year: number;
  warningText?: string;
}

type ProjectKey = keyof typeof projects;

interface ProjectClientProps {
  dict: any; // Типізуй словник під себе
  projectName: string;
}

export default function ProjectClient({
  dict,
  projectName,
}: ProjectClientProps) {
  const { scrollOrNavigate } = useScrollOrNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const project = projects[projectName as ProjectKey] as Project;

  const openImage = (index: number) => {
    setActiveIndex(index);
  };

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + project?.images.length) % project?.images.length,
    );
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % project?.images.length,
    );
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
        return;
      }

      if (activeIndex === null) return;

      if (e.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % project?.images.length,
        );
      }

      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + project?.images.length) % project?.images.length,
        );
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, project?.images?.length]);

  if (!project) {
    return <></>;
  }

  // Захист шляху для бекграунду (щоб працювало на локалізованих роутах /en, /uk)
  const bgImage = project.thumbnail.startsWith("/")
    ? project.thumbnail
    : `/${project.thumbnail}`;

  return (
    <section className="flex flex-col relative py-[3rem] px-0 pb-[4rem]">
      {/* ProjectThumbnail */}
      <div
        className="w-full h-[20rem] bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* ProjectInfo */}
      <div className="relative flex flex-col max-w-[80rem] mx-auto px-[1rem] py-[1rem] w-full">
        {/* ProjectName */}
        <div className="w-full gap-[min(1vw,1rem)] absolute text-[min(6vw,4rem)] [transform:translate(0rem,calc(-50%-1rem))] flex items-center font-eurostyle text-(--main-color)">
          <span
            onClick={() => scrollOrNavigate("/", "projects")}
            className="flex cursor-pointer items-center p-[1rem] max-[850px]:p-[0.5rem] [&_svg]:h-[2rem] [&_svg]:w-[2rem] max-[850px]:[&_svg]:h-[1rem] max-[850px]:[&_svg]:w-[1rem] [&_path]:fill-(--main-color) [&_path]:transition-[fill] [&_path]:duration-150 [&_path]:ease-linear"
          >
            {arrowSvg}
          </span>
          {dict.project?.[projectName]?.label || projectName}
        </div>

        {/* Warning */}
        {dict.project?.[projectName]?.warningText && (
          <div className="grid grid-cols-[auto_1fr] border border-[#979726] rounded-[10px] max-w-[40rem] self-center items-center gap-[1rem] px-[1rem] py-[0.5rem] text-[#979726] mt-[4rem] max-[850px]:mt-[2rem] max-[850px]:text-[0.85rem] [&_svg]:h-[2rem] [&_svg]:w-[2rem] [&_path]:fill-[#979726]">
            {warningSvg}
            {dict.project[projectName].warningText}
          </div>
        )}

        {/* Skills & Meta */}
        {project.skills && (
          <>
            <p className="m-[3rem_1rem_1rem] font-eurostyle text-[2rem] max-[850px]:text-[1.5rem] max-[850px]:m-[2rem_0.75rem_0.75rem] text-(--main-color)">
              {dict.project?.labels?.skills || "Технології"}
            </p>

            <div className="flex gap-[0.5rem] flex-wrap max-[850px]:gap-[0.25rem]">
              {project.skills.map((s: string, i: number) => (
                <div
                  key={`skill-${i}`}
                  className="px-[1rem] py-[0.5rem] rounded-[10px] border border-(--grey-color-light) bg-(--reverse-color) opacity-90 flex items-center justify-center text-[1rem] max-[850px]:px-[0.85rem] max-[850px]:py-[0.5rem] max-[850px]:text-[0.75rem] text-(--main-color)"
                >
                  {s}
                </div>
              ))}
            </div>

            <div className="flex gap-[0.5rem] flex-wrap mt-[1.75rem] max-[850px]:gap-[0.25rem]">
              <div className="px-[1rem] py-[0.5rem] rounded-[10px] border border-(--grey-color-light) bg-(--reverse-color) opacity-90 flex items-center justify-center text-[1rem] max-[850px]:px-[0.85rem] max-[850px]:py-[0.5rem] max-[850px]:text-[0.75rem] text-(--main-color)">
                {project.isSolo ? dict.project?.own : dict.project?.team}
              </div>
              <div className="px-[1rem] py-[0.5rem] rounded-[10px] border border-(--grey-color-light) bg-(--reverse-color) opacity-90 flex items-center justify-center text-[1rem] max-[850px]:px-[0.85rem] max-[850px]:py-[0.5rem] max-[850px]:text-[0.75rem] text-(--main-color)">
                {project.isDesigned
                  ? dict.project?.ownDesign
                  : dict.project?.someonesDesign}
              </div>
              <div className="px-[1rem] py-[0.5rem] rounded-[10px] border border-(--grey-color-light) bg-(--reverse-color) opacity-90 flex items-center justify-center text-[1rem] max-[850px]:px-[0.85rem] max-[850px]:py-[0.5rem] max-[850px]:text-[0.75rem] text-(--main-color)">
                {project.year} {dict.project?.year}
              </div>
              <div className="px-[1rem] py-[0.5rem] rounded-[10px] border border-(--grey-color-light) bg-(--reverse-color) opacity-90 flex items-center justify-center text-[1rem] max-[850px]:px-[0.85rem] max-[850px]:py-[0.5rem] max-[850px]:text-[0.75rem] text-(--main-color)">
                {dict.project?.duration} {project.durationMonths}{" "}
                {dict.project?.months}
              </div>
            </div>
          </>
        )}

        {/* Link */}
        {project.url && (
          <>
            <p className="m-[3rem_1rem_1rem] font-eurostyle text-[2rem] max-[850px]:text-[1.5rem] max-[850px]:m-[2rem_0.75rem_0.75rem] text-(--main-color)">
              {dict.project?.labels?.link || "Посилання"}
            </p>
            <a
              target="_blank"
              href={project.url}
              className="flex items-center gap-[1rem] w-max text-[1.25rem] transition-all duration-150 ease-in-out hover:underline max-[850px]:text-[1rem] [&_p]:text-[#9999fb] [&_path]:fill-[#9999fb]"
            >
              <p>{project.url}</p>
              {linkSvg}
            </a>
          </>
        )}

        {/* Description */}
        <p className="m-[3rem_1rem_1rem] font-eurostyle text-[2rem] max-[850px]:text-[1.5rem] max-[850px]:m-[2rem_0.75rem_0.75rem] text-(--main-color)">
          {dict.project?.labels?.description || "Опис"}
        </p>
        <div
          className="flex flex-col [text-indent:1.5rem] mt-[0.5rem] max-[850px]:[text-indent:1rem] text-(--main-color) [&_h3]:font-semibold [&_h3]:text-[1.4rem] [&_h3]:leading-[120%] [&_h3]:mb-[0.25rem] max-[850px]:[&_h3]:text-[1rem] max-[850px]:[&_h3]:mb-[0.15rem] [&_p]:leading-[150%] [&_p]:text-[1.1rem] [&_p]:mb-[1.5rem] max-[850px]:[&_p]:text-[0.85rem] max-[850px]:[&_p]:mb-[1rem]"
          dangerouslySetInnerHTML={{
            __html:
              dict.project?.[projectName]?.description || project.description,
          }}
        />

        {/* Gallery */}
        <p className="m-[3rem_1rem_1rem] font-eurostyle text-[2rem] max-[850px]:text-[1.5rem] max-[850px]:m-[2rem_0.75rem_0.75rem] text-(--main-color)">
          {dict.project?.labels?.gallery || "Галерея"}
        </p>
        <div className="grid grid-cols-2 items-center justify-center gap-[1.5rem] max-[850px]:gap-[1rem]">
          {project.images.map((image: string, i: number) => {
            const cleanSrc = image.startsWith("/") ? image : `/${image}`;
            return (
              <img
                key={`image-${i}`}
                src={cleanSrc}
                alt={`Скріншот ${i + 1}`}
                onClick={() => openImage(i)}
                className="w-full rounded-[0.5rem] object-cover cursor-pointer transition-all duration-150 ease-in-out hover:scale-[1.02] hover:shadow-[0_0_25px_var(--image-overlay)]"
              />
            );
          })}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 [background:var(--image-overlay)] flex items-center justify-center z-[999]"
          onClick={closeLightbox}
        >
          <div
            className="relative w-[calc(100vw-12rem)] h-[60vh] flex items-center justify-center max-[850px]:w-[calc(100vw-8rem)]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={
                project.images[activeIndex].startsWith("/")
                  ? project.images[activeIndex]
                  : `/${project.images[activeIndex]}`
              }
              alt={`Скріншот ${activeIndex + 1}`}
              className="max-w-full max-h-[60vh] rounded-[1rem] border border-[#ffffff33] object-contain max-[850px]:rounded-[0.5rem]"
            />

            {project.images.length > 1 && (
              <>
                {/* Prev Arrow */}
                <button
                  onClick={showPrev}
                  className="absolute top-1/2 -translate-y-1/2 border-none bg-(--main-color) w-[3rem] h-[3rem] rounded-full cursor-pointer text-[2rem] flex items-center justify-center select-none hover:bg-[rgba(30,64,175,0.9)] max-[850px]:w-[2rem] max-[850px]:h-[2rem] left-[-4rem] max-[850px]:left-[-3rem] [&_path]:fill-(--reverse-color)"
                >
                  {arrowSvg}
                </button>
                {/* Next Arrow */}
                <button
                  onClick={showNext}
                  className="absolute top-1/2 -translate-y-1/2 border-none bg-(--main-color) w-[3rem] h-[3rem] rounded-full cursor-pointer text-[2rem] flex items-center justify-center select-none hover:bg-[rgba(30,64,175,0.9)] max-[850px]:w-[2rem] max-[850px]:h-[2rem] right-[-4rem] max-[850px]:right-[-3rem] rotate-180 [&_path]:fill-(--reverse-color)"
                >
                  {arrowSvg}
                </button>
              </>
            )}

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-[-3.5rem] right-0 border-none bg-(--main-color) text-(--reverse-color) rounded-full cursor-pointer text-[1.5rem] w-[3rem] h-[3rem] flex items-center justify-center hover:bg-[rgba(220,38,38,0.9)] max-[850px]:w-[2.5rem] max-[850px]:h-[2.5rem] max-[850px]:text-[1rem]"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// ======================= SVGS =======================
const warningSvg = (
  <svg
    width="23"
    height="21"
    viewBox="0 0 23 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.0395 14.0686C10.8417 14.0686 10.6484 14.1273 10.4839 14.2372C10.3195 14.347 10.1913 14.5032 10.1156 14.6859C10.04 14.8687 10.0201 15.0697 10.0587 15.2637C10.0973 15.4577 10.1926 15.6359 10.3324 15.7757C10.4723 15.9156 10.6504 16.0108 10.8444 16.0494C11.0384 16.088 11.2395 16.0682 11.4222 15.9925C11.6049 15.9168 11.7611 15.7887 11.871 15.6242C11.9809 15.4598 12.0395 15.2664 12.0395 15.0686C12.0395 14.8034 11.9342 14.5491 11.7466 14.3615C11.5591 14.174 11.3047 14.0686 11.0395 14.0686ZM21.7095 15.5386L13.6595 1.53863C13.3993 1.07215 13.0193 0.683589 12.5587 0.4131C12.0981 0.142611 11.5737 0 11.0395 0C10.5054 0 9.98092 0.142611 9.52033 0.4131C9.05973 0.683589 8.67971 1.07215 8.41952 1.53863L0.419518 15.5386C0.150314 15.9926 0.0056609 16.5097 0.000162801 17.0375C-0.0053353 17.5652 0.128516 18.0852 0.388204 18.5447C0.647892 19.0042 1.02422 19.3871 1.4792 19.6547C1.93418 19.9222 2.4517 20.065 2.97952 20.0686H19.0995C19.6316 20.0739 20.1554 19.9375 20.6174 19.6735C21.0794 19.4096 21.4629 19.0275 21.7285 18.5665C21.9941 18.1054 22.1324 17.582 22.129 17.05C22.1257 16.5179 21.9809 15.9963 21.7095 15.5386ZM19.9795 17.5386C19.8919 17.6946 19.764 17.8242 19.6092 17.9139C19.4544 18.0036 19.2784 18.0501 19.0995 18.0486H2.97952C2.80063 18.0501 2.62462 18.0036 2.46984 17.9139C2.31505 17.8242 2.18717 17.6946 2.09952 17.5386C2.01175 17.3866 1.96554 17.2142 1.96554 17.0386C1.96554 16.8631 2.01175 16.6906 2.09952 16.5386L10.0995 2.53863C10.1834 2.37483 10.3109 2.23736 10.468 2.14137C10.625 2.04538 10.8055 1.99459 10.9895 1.99459C11.1736 1.99459 11.354 2.04538 11.5111 2.14137C11.6681 2.23736 11.7956 2.37483 11.8795 2.53863L19.9295 16.5386C20.0287 16.6885 20.0857 16.8623 20.0945 17.0418C20.1033 17.2213 20.0636 17.3998 19.9795 17.5586V17.5386ZM11.0395 6.06863C10.7743 6.06863 10.5199 6.17399 10.3324 6.36152C10.1449 6.54906 10.0395 6.80341 10.0395 7.06863V11.0686C10.0395 11.3338 10.1449 11.5882 10.3324 11.7757C10.5199 11.9633 10.7743 12.0686 11.0395 12.0686C11.3047 12.0686 11.5591 11.9633 11.7466 11.7757C11.9342 11.5882 12.0395 11.3338 12.0395 11.0686V7.06863C12.0395 6.80341 11.9342 6.54906 11.7466 6.36152C11.5591 6.17399 11.3047 6.06863 11.0395 6.06863Z" />
  </svg>
);

const linkSvg = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.9258 0.62C11.8243 0.375651 11.6301 0.181475 11.3858 0.0799999C11.2656 0.028759 11.1365 0.00157999 11.0058 0H1.0058C0.740582 0 0.486228 0.105357 0.298692 0.292893C0.111155 0.48043 0.00579834 0.734784 0.00579834 1C0.00579834 1.26522 0.111155 1.51957 0.298692 1.70711C0.486228 1.89464 0.740582 2 1.0058 2H8.5958L0.295798 10.29C0.20207 10.383 0.127676 10.4936 0.0769072 10.6154C0.0261385 10.7373 0 10.868 0 11C0 11.132 0.0261385 11.2627 0.0769072 11.3846C0.127676 11.5064 0.20207 11.617 0.295798 11.71C0.388761 11.8037 0.499362 11.8781 0.621222 11.9289C0.743081 11.9797 0.873786 12.0058 1.0058 12.0058C1.13781 12.0058 1.26852 11.9797 1.39038 11.9289C1.51223 11.8781 1.62284 11.8037 1.7158 11.71L10.0058 3.41V11C10.0058 11.2652 10.1112 11.5196 10.2987 11.7071C10.4862 11.8946 10.7406 12 11.0058 12C11.271 12 11.5254 11.8946 11.7129 11.7071C11.9004 11.5196 12.0058 11.2652 12.0058 11V1C12.0042 0.869323 11.977 0.740222 11.9258 0.62Z" />
  </svg>
);

const arrowSvg = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10.995 5.00409H3.40501L6.70501 1.71409C6.89332 1.52579 6.9991 1.27039 6.9991 1.00409C6.9991 0.73779 6.89332 0.482395 6.70501 0.294092C6.51671 0.105788 6.26132 0 5.99501 0C5.72871 0 5.47332 0.105788 5.28501 0.294092L0.285014 5.29409C0.193973 5.3892 0.122608 5.50134 0.0750135 5.62409C-0.0250045 5.86755 -0.0250045 6.14063 0.0750135 6.38409C0.122608 6.50684 0.193973 6.61899 0.285014 6.71409L5.28501 11.7141C5.37798 11.8078 5.48858 11.8822 5.61044 11.933C5.7323 11.9838 5.863 12.0099 5.99501 12.0099C6.12703 12.0099 6.25773 11.9838 6.37959 11.933C6.50145 11.8822 6.61205 11.8078 6.70501 11.7141C6.79874 11.6211 6.87314 11.5105 6.9239 11.3887C6.97467 11.2668 7.00081 11.1361 7.00081 11.0041C7.00081 10.8721 6.97467 10.7414 6.9239 10.6195C6.87314 10.4977 6.79874 10.3871 6.70501 10.2941L3.40501 7.00409H10.995C11.2602 7.00409 11.5146 6.89873 11.7021 6.7112C11.8897 6.52366 11.995 6.26931 11.995 6.00409C11.995 5.73888 11.8897 5.48452 11.7021 5.29699C11.5146 5.10945 11.2602 5.00409 10.995 5.00409Z" />
  </svg>
);
