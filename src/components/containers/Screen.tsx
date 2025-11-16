import styled from 'styled-components';
import { useThemeContext } from '../../hooks/useThemeContext';
import type { ReactNode } from 'react';

const StyledDiv = styled.div<{ $theme: string }>`
  min-height:30rem;
`;

function FullScreen({ id, children }: { id: string, children:ReactNode }) {
  const { theme } = useThemeContext();

  return (
    <StyledDiv id={id} $theme={theme}>
      {children}
    </StyledDiv>
  );
}

export default FullScreen;
