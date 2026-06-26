"use client";

import { SUPPORTED_LANGUAGES } from "@/constants";
import { useScrollObserver } from "@/hooks/useScrollObserver";
import { useTheme } from "@/providers/ThemeProvider";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState, useSyncExternalStore } from "react";

interface FloatingWidgetProps {
  position: "left" | "right";
  onClick?: () => void;
  children: ReactNode;
  dropdown?: ReactNode;
  className?: string;
}

function FloatingWidget({
  position,
  onClick,
  children,
  dropdown,
  className = "",
}: FloatingWidgetProps) {
  const { isVisible } = useScrollObserver();

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isClient) return null;

  const positionClass = position === "left" ? "left-[2rem]" : "right-[2rem]";

  return (
    <div className={`fixed bottom-8 ${positionClass} z-193 select-none`}>
      <button
        onClick={onClick}
        className={`rounded-[5px] cursor-pointer transition-(--transition) hover:bg-(--accent-color) hover:border-(--accent-color) hover:text-white hover:stroke-white ${
          !isVisible ? "bg-(--nav-bg-color) backdrop-blur-xs" : ""
        } ${className}`}
      >
        {children}
      </button>

      {dropdown}
    </div>
  );
}

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <FloatingWidget
      position="left"
      onClick={toggleTheme}
      className="flex h-8 w-8 items-center justify-center stroke-(--main-color)"
    >
      {theme === "light" ? (
        <svg
          fill="none"
          height="20"
          width="20"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g strokeWidth="1.5">
            <path d="m17 12c0 2.7614-2.2386 5-5 5-2.76142 0-5-2.2386-5-5 0-2.76142 2.23858-5 5-5 2.7614 0 5 2.23858 5 5z" />
            <path
              d="m12 2v1.5m0 17v1.5m7.0708-2.9287-1.0607-1.0607m-12.02084-12.02134-1.06066-1.06066m17.0714 7.0714h-1.5m-17 0h-1.5m17.0713-7.07129-1.0607 1.06066m-12.02085 12.02133-1.06066 1.0607"
              strokeLinecap="round"
            />
          </g>
        </svg>
      ) : (
        <svg
          fill="none"
          height="20"
          width="20"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m21.5 14.0784c-1.1997.6405-2.5699 1.0037-4.0249 1.0037-4.726 0-8.55718-3.8312-8.55718-8.55725 0-1.45499.36313-2.82517 1.00371-4.02485-4.25398.99698-7.42163 4.81513-7.42163 9.3731 0 5.3168 4.3101 9.6269 9.6269 9.6269 4.558 0 8.3761-3.1676 9.3731-7.4216z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      )}
    </FloatingWidget>
  );
}

function LangSwitcher() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const lang = pathname.split("/")[0] || pathname.slice(1, 3);

  const toggleDropdown = () => setOpen(!open);

  const selectLang = (newLang: string) => {
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.replace(segments.join("/"));
    setOpen(false);
  };

  return (
    <FloatingWidget
      position="right"
      onClick={toggleDropdown}
      className="font-['Montserrat',sans-serif] text-base py-1 px-3 text-(--main-color) text-center"
      dropdown={
        open ? <LangOptions lang={lang} selectLang={selectLang} /> : null
      }
    >
      {lang.toUpperCase()}
    </FloatingWidget>
  );
}

function LangOptions({
  lang,
  selectLang,
}: {
  lang: string;
  selectLang: (l: string) => void;
}) {
  return (
    <ul className="m-0 py-1 px-0 list-none bg-(--reverse-color) rounded-[5px] absolute bottom-[120%] right-0 min-w-full shadow-[0_0_10px_var(--grey-color)] transition-(--transition)">
      {SUPPORTED_LANGUAGES.map((l: string) => {
        return (
          lang !== l && (
            <li
              key={l}
              onClick={() => selectLang(l)}
              className="text-center text-(--main-color) py-1 px-3 text-[0.95rem] font-['Montserrat',sans-serif] cursor-pointer transition-(--transition) hover:bg-(--grey-color-light)"
            >
              {l.toUpperCase()}
            </li>
          )
        );
      })}
    </ul>
  );
}

export { LangSwitcher, ThemeSwitcher };
