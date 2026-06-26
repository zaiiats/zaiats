import type { ReactNode } from "react";

type SecondaryTextType = "huge" | "big" | "medium" | "small" | "little";

const fontSizeMap: Record<SecondaryTextType, string> = {
  huge: "text-[2.2rem]",
  big: "text-[1.6rem]",
  medium: "text-[1.2rem]",
  small: "text-[0.875rem]",
  little: "text-[0.875rem]",
};

interface SecondaryTextProps {
  children: ReactNode;
  size: SecondaryTextType;
}

function SecondaryText({ children, size }: SecondaryTextProps) {
  return (
    <p 
      className={`font-montserrat ${fontSizeMap[size]} leading-[130%] text-(--main-color) transition-[color] duration-150 ease-linear [&_span]:font-semibold [&_span]:text-[1.1em] [&_span]:text-(--accent-color) [&_span]:transition-[color] [&_span]:duration-150 [&_span]:ease-linear`}
    >
      {children}
    </p>
  );
}

export default SecondaryText;