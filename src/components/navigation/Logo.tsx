import type { MouseEvent } from 'react';
import styled from 'styled-components';
import { useScrollOrNavigate } from '../../hooks/useScrollOrNavigate';
import { useThemeContext } from '../../hooks/useThemeContext';

const StyledDiv = styled.div`
  height: 3rem;
  width: 20vw;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  position: relative;
`;

const StyledText = styled.p`
  z-index: 101;
  padding-top: 0.3rem;
  transition: var(--transition);

  &:hover {
    color: var(--grey-color);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (hover: none) {
    &:hover {
      color: var(--main-color);
      background-color: transparent;
    }
  }
`;

const SkewedDivFirst = styled.div<{ $theme: 'light' | 'dark' }>`
  position: absolute;
  height: 3rem;
  width: 15vw;
  background-color: var(--frame-color);
  left: 0;
  transform: skewX(30deg);
  transition: all 0.15s ease-in-out;
`;

const SkewedDivSecond = styled.div<{ $theme: 'light' | 'dark' }>`
  position: absolute;
  height: 3rem;
  width: 15vw;
  background-color: var(--frame-color);
  right: 0;
  transform: skewX(-30deg);
  transition: all 0.15s ease-in-out;
`;

function Logo() {
  const { scrollOrNavigate } = useScrollOrNavigate();
  const {theme } = useThemeContext()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollOrNavigate('/', 'home');
  };

  return (
    <StyledDiv>
      <SkewedDivFirst $theme={theme}/>
      <SkewedDivSecond $theme={theme}/>
      <StyledText>
        <a href='#home' onClick={handleClick}>
          Zaiiats
        </a>
      </StyledText>
    </StyledDiv>
  );
}

export default Logo;
