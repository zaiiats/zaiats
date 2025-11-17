import { useLayoutEffect, type ReactNode } from "react";
import styled from "styled-components";
import Nav from "../navigation/Nav";
import { useLocation } from "react-router-dom";
import { smoothScrollTo } from "../../scripts/navigation";
import ThemeSwitcher from "../standalone/ThemeSwitcher";
import LangSwitcher from "../standalone/LangSwitcher";

const StyledDiv = styled.div`
  padding: 1rem;
  height: 100dvh;
  overflow-y: hidden;
  width: 100%;
  display: flex;
  color: var(--main-color);
`;

const Div = styled.div`
  padding: 0rem 0vw 0 0vw;
  width: 100%;
  z-index: 2;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  background-color: var(--bg-color);
  transition: var(--transition);

  &::-webkit-scrollbar {
    display: none;
  }
`;

function MainContent({ children }: { children: ReactNode }) {
  const location = useLocation();

  useLayoutEffect(() => {
    const mainContainer = document.getElementById("mainContainer");
    if (!mainContainer) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scrollTo = (location.state as any)?.scrollTo as string | undefined;

    if (scrollTo) {
      requestAnimationFrame(() => {
        smoothScrollTo(scrollTo, scrollTo === "main");
      });

      const historyState = window.history.state || {};
      window.history.replaceState(
        {
          ...historyState,
          usr: {
            ...historyState.usr,
            scrollTo: undefined,
          },
        },
        ""
      );
    } else {
      // якщо це просто перехід на іншу сторінку — ресет скролу
      mainContainer.scrollTo({ top: 0 });
    }
  }, [location.pathname, location.state]);

  return (
    <StyledDiv>
      <Nav />
      <Div id="mainContainer">{children}</Div>
      <ThemeSwitcher />
      <LangSwitcher />
    </StyledDiv>
  );
}

export default MainContent;
