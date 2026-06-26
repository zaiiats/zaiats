import type { ReactNode } from "react";

type MainTextType = "huge" | "big" | "small" | "little";

const fontSizeMap: Record<MainTextType, string> = {
  huge: "text-[8vw]",
  big: "text-[2rem]",
  small: "text-[1.25rem]",
  little: "text-[1rem]",
};

interface MainTextProps {
  children: ReactNode;
  size: MainTextType;
  isGlowing?: boolean;
}

function MainText({ children, size, isGlowing = false }: MainTextProps) {
  return (
    <p
      className={`font-eurostyle ${fontSizeMap[size]} ${isGlowing ? "text-glow-sm" : ""} transition-(--transition) [&_span]:text-(--accent-color) [&_span]:transition-[color] [&_span]:duration-150 [&_span]:ease-linear`}
    >
      {children}
    </p>
  );
}

export default MainText;
