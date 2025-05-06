import type { MouseEvent } from 'react';
import styled from 'styled-components';
import { useScrollOrNavigate } from '../../hooks/useScrollOrNavigate';

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

  & a:hover {
    color: #ccc;
  };

  & a:active {
    transform: scale(0.98);
  };
`;

const SkewedDivFirst = styled.div`
  position: absolute;
  height: 3rem;
  width: 15vw;
  background-color: black;
  left: 0;
  transform: skewX(30deg);
`;
const SkewedDivSecond = styled.div`
  position: absolute;
  height: 3rem;
  width: 15vw;
  right: 0;
  background-color: black;
  transform: skewX(-30deg);
`;

function Logo() {
  const {scrollOrNavigate} = useScrollOrNavigate()
  
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollOrNavigate('/', 'home');
  };

  return (
    <StyledDiv>
      <SkewedDivFirst />
      <SkewedDivSecond />
      <StyledText>
        <a href='#home' onClick={handleClick}>
          Zaiiats
        </a>
      </StyledText>
    </StyledDiv>
  );
}

export default Logo;
