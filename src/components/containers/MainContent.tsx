import { useEffect, useRef, type ReactNode } from "react";
import styled from "styled-components";
import Nav from "../navigation/Nav";
import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const hasHandledScroll = useRef(false);

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (scrollTo && !hasHandledScroll.current) {
      hasHandledScroll.current = true;

      setTimeout(() => {
        smoothScrollTo(scrollTo, scrollTo === "main");
        navigate(location.pathname, { replace: true, state: {} });
      }, 100);
    }
  }, [location, navigate]);

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
