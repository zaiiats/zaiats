"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { smoothScrollTo } from "@/utils/scroll";
import { useModal } from "@/providers/ModalProvider";

interface NavProps {
  dict: {
    projects: string;
    about: string;
  };
}

function Nav({ dict }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { closeModal } = useModal();

  useEffect(() => {
    const container = document.getElementById("mainContainer");
    if (!container) return;

    const onScroll = () => {
      setScrolled(container.scrollTop > 0);
    };

    onScroll();

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeModal();

    const segments = pathname.split("/");
    const lang = segments[1];

    if (
      segments.length === 2 ||
      (segments.length === 3 && segments[2] === "")
    ) {
      smoothScrollTo(id);
    } else {
      router.push(`/${lang}#${id}`);
    }
  };

  const navLinkClass = `
    flex-1 flex justify-center items-center text-center self-stretch 
    select-none no-underline cursor-pointer transition-colors duration-150 linear 
    hover:text-(--grey-color)
  `;

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 w-full h-12 tracking-wider flex items-center font-eurostyle text-[0.8rem] z-100 text-(--main-color) transition-[background-color,backdrop-filter] duration-300 ease-in-out px-4 ${
        scrolled ? "backdrop-blur-[10px] bg-(--nav-bg-color)" : "bg-transparent"
      }`}
    >
      <a
        href="#about"
        onClick={(e) => handleClick(e, "about")}
        className={navLinkClass}
      >
        {dict.about}
      </a>
      <Logo />
      <a
        href="#projects"
        onClick={(e) => handleClick(e, "projects")}
        className={navLinkClass}
      >
        {dict.projects}
      </a>
    </nav>
  );
}

export default Nav;
