import type { MouseEvent } from "react";
import styled from "styled-components";
import { useScrollOrNavigate } from "../../hooks/useScrollOrNavigate";
import { useThemeContext } from "../../hooks/useThemeContext";

const StyledText = styled.div`
  z-index: 101;
  height: 3rem;
  width: 20rem;
  text-align: center;
  padding-top: 0.3rem;
  background-color: var(--frame-color);
  transition: var(--transition);
  cursor: pointer;

  @media (hover: none) {
    &:hover {
      color: var(--main-color);
      background-color: transparent;
    }
  }
`;

const StyledDiv = styled.div`
  height: 3rem;
  width: 20rem;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  position: relative;

  &:hover ${StyledText} {
    color: var(--grey-color);
  }
`;

const SkewedDivFirst = styled.div<{ $theme: "light" | "dark" }>`
  z-index: 102;
  position: absolute;
  height: 3rem;
  width: 1.732rem;
  background-color: var(--frame-color);
  left: 0;
  transform: skewX(30deg) translateX(-50%);
  transition: all 0.15s ease-in-out;
  cursor: pointer;
`;

const SkewedDivSecond = styled.div<{ $theme: "light" | "dark" }>`
  z-index: 102;
  position: absolute;
  height: 3rem;
  width: 1.732rem;
  background-color: var(--frame-color);
  right: 0;
  transform: skewX(-30deg) translateX(50%);
  transition: all 0.15s ease-in-out;
  cursor: pointer;
`;

function Logo() {
  const { scrollOrNavigate } = useScrollOrNavigate();
  const { theme } = useThemeContext();

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    scrollOrNavigate("/", "home");
  };

  return (
    <StyledDiv onClick={handleClick}>
      <SkewedDivFirst $theme={theme} />
      <SkewedDivSecond $theme={theme} />
      <StyledText>Zaiiats</StyledText>
    </StyledDiv>
  );
}

export default Logo;
