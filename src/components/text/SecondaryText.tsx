import type { ReactNode } from 'react';
import styled from 'styled-components';

type SecondaryTextType = 'huge' | 'big' | 'medium' | 'small' | 'little';

const fontSizeMap: Record<SecondaryTextType, string> = {
  huge: '2.2rem',
  big: '1.6rem',
  medium: '1.2rem',
  small: '0.875rem',
  little: '0.875rem',
};

const StyledP = styled.p<{ $size: SecondaryTextType }>`
  font-family: 'Montserrat', sans-serif;
  font-size: ${({ $size }) => fontSizeMap[$size]};
  line-height:130%;

  span {
    font-weight: 600;
    font-size: 1.1em;
    color: var(--accent-color);
  }
`;

function SecondaryText({
  children,
  size,
}: {
  children: ReactNode;
  size: SecondaryTextType;
}) {
  return <StyledP $size={size}>{children}</StyledP>;
}

export default SecondaryText;
