import { useEffect, type ReactNode } from 'react';
import styled from 'styled-components';
import Nav from '../navigation/Nav';
import { useLocation } from 'react-router-dom';
import { smoothScrollTo } from '../../scripts/navigation';
import ThemeSwitcher from '../standalone/ThemeSwitcher';
import LangSwitcher from '../standalone/LangSwitcher';

const StyledDiv = styled.div`
  padding: 1rem;
  height: 100dvh;
  overflow-y: hidden;
  width: 100%;
  display: flex;
  color: var(--main-color);
`;

const Img = styled.img`
  position: absolute;
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  user-select: none;
  background-color: var(--frame-color);
  -webkit-user-drag: none;
  transition:var(--transition);
`;

const Div = styled.div`
  padding: 3rem 2.5vw 0 2.5vw;
  width: 100%;
  z-index: 2;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  border-radius: 50px;
  background-color: var(--bg-color);
  transition: var(--transition);

  &::-webkit-scrollbar {
    display: none;
  }
`;

function MainContent({ children }: { children: ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (scrollTo) {
      setTimeout(() => {
        smoothScrollTo(scrollTo);
      }, 100);
    }
  }, [location]);

  return (
    <StyledDiv>
      <Img src='/images/frame.png' />
      <Nav />
      <Div id='mainContainer'>{children}</Div>
      <ThemeSwitcher />
      <LangSwitcher />
    </StyledDiv>
  );
}

export default MainContent;
