import styled, { css } from 'styled-components';
import { useThemeContext } from '../../hooks/useThemeContext';

const Border = styled.div<{
  $position: 'top' | 'bottom' | 'left' | 'right';
  $theme: 'light' | 'dark';
}>`
  position: absolute;
  background-color: var(--frame-color);
  z-index: 10000;
  transition: all 0.15s ease-in-out;

  ${({ $position }) => {
    switch ($position) {
      case 'top':
        return css`
          top: 0;
          height: 1rem;
          width: 100%;
        `;
      case 'bottom':
        return css`
          bottom: 0;
          height: 1rem;
          width: 100%;
        `;
      case 'left':
        return css`
          left: 0;
          width: 1rem;
          height: 100%;
        `;
      case 'right':
        return css`
          right: 0;
          width: 1rem;
          height: 100%;
        `;
    }
  }}
`;

const StyledFrame = styled.div`
  position: absolute;
  width: 100%;
  height: 100dvh;
`;

const Frame = () => {

  const {theme } = useThemeContext()

  return (
    <StyledFrame>
      <Border $position='top' $theme={theme} />
      <Border $position='bottom' $theme={theme} />
      <Border $position='left' $theme={theme} />
      <Border $position='right' $theme={theme} />
    </StyledFrame>
  );
};

export default Frame;
