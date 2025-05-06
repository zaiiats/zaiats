import styled, { css } from 'styled-components';

const Border = styled.div<{
  $position: 'top' | 'bottom' | 'left' | 'right';
}>`
  position: absolute;
  background-color: black;
  z-index: 10000;

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
  return (
    <StyledFrame>
      <Border $position='top' />
      <Border $position='bottom' />
      <Border $position='left' />
      <Border $position='right' />
    </StyledFrame>
  );
};

export default Frame;
