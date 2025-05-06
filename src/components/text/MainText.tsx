import type { ReactNode } from 'react';
import styled from 'styled-components';

type MainTextType = 'huge' | 'big' | 'small' | 'little';

const fontSizeMap: Record<MainTextType, string> = {
  huge: '8vw',
  big: '2rem',
  small: '1.25rem',
  little: '1rem',
};

const StyledP = styled.p<{ $size: MainTextType }>`
  font-family: 'Eurostyle', sans-serif;
  font-size: ${({ $size }) => fontSizeMap[$size]};

  span {
    color: #6969ff;
  }
`;

function MainText({ children, size }: { children: ReactNode; size: MainTextType }) {
  return <StyledP $size={size}>{children}</StyledP>;
}

export default MainText;
