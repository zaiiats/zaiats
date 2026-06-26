"use client";

import { useScrollOrNavigate } from "@/hooks/useScrollOrNavigate";
import { useModal } from "@/providers/ModalProvider";
import type { MouseEvent } from "react";

function Logo() {
  const { scrollOrNavigate } = useScrollOrNavigate();
  const { closeModal } = useModal();

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    closeModal();
    scrollOrNavigate("/", "home");
  };

  return (
    <div className="group relative flex h-12 w-80 justify-center text-[1.5rem] cursor-pointer max-[850px]:hidden">
      <div className="absolute left-0 z-102 h-12 w-[1.732rem] bg-(--frame-color) transform-[skewX(30deg)_translateX(-50%)] transition-colors duration-150" />
      <div className="absolute right-0 z-102 h-12 w-[1.732rem] bg-(--frame-color) transform-[skewX(-30deg)_translateX(50%)] transition-colors duration-150" />

      <div className="absolute z-101 h-12 w-80 bg-(--frame-color) transition-colors duration-150 [@media(hover:none)]:hover:bg-transparent" />

      <a
        onClick={handleClick}
        href="#"
        className="absolute flex justify-center items-start inset-0 z-103 text-white group-hover:text-[#444444] [@media(hover:none)]:hover:text-(--main-color) select-none no-underline transition-colors duration-150 ease-in-out"
      >
        Zaiiats
      </a>
    </div>
  );
}

export default Logo;
