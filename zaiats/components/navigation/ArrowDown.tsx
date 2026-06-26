"use client";

import { type MouseEvent } from "react";
import { smoothScrollTo } from "@/utils/scroll";
import { useScrollObserver } from "@/hooks/useScrollObserver";

function ArrowDown() {
  const { isVisible } = useScrollObserver();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    smoothScrollTo("about");
  };

  return (
    <div
      className={`fixed h-6 bottom-4 left-1/2 z-193 transition-opacity duration-200 ease-in-out animate-[arrow-bounce_1.5s_infinite] ${
        isVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-end justify-center w-full">
        <a href="#projects" onClick={handleClick}>
          <svg
            fill="none"
            height="2rem"
            viewBox="0 0 24 24"
            width="2rem"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-(--main-color) [transition:var(--transition)] hover:stroke-(--accent-color)"
          >
            <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="m6 12.5 5.3243 4.8806c.3208.2941.4812.4411.6757.4411s.3549-.147.6757-.4411l5.3243-4.8806" />
              <path d="m6 6 5.3243 4.8806c.3208.2941.4812.4411.6757.4411s.3549-.147.6757-.4411l5.3243-4.8806" />
            </g>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default ArrowDown;
