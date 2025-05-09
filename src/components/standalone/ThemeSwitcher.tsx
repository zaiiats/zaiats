import styled from 'styled-components';
import { useThemeContext } from '../../hooks/useThemeContext';

const StyledDiv = styled.div`
  position: fixed;
  height: 2rem;
  width: 2rem;
  bottom: 2rem;
  left: 3rem;
  z-index: 193;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  transition:var(--transition);

  &:hover {
    background-color: var(--accent-color);
  }
`;

const Svg = styled.svg`
  stroke: var(--main-color);
  transition: var(--transition);
`;

function ThemeSwitcher() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <StyledDiv onClick={toggleTheme}>
      {theme === 'light' ? (
        <Svg
          fill='none'
          height='24'
          viewBox='0 0 24 24'
          width='24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g strokeWidth='1.5'>
            <path d='m17 12c0 2.7614-2.2386 5-5 5-2.76142 0-5-2.2386-5-5 0-2.76142 2.23858-5 5-5 2.7614 0 5 2.23858 5 5z' />
            <path
              d='m12 2v1.5m0 17v1.5m7.0708-2.9287-1.0607-1.0607m-12.02084-12.02134-1.06066-1.06066m17.0714 7.0714h-1.5m-17 0h-1.5m17.0713-7.07129-1.0607 1.06066m-12.02085 12.02133-1.06066 1.0607'
              strokeLinecap='round'
            />
          </g>
        </Svg>
      ) : (
        <Svg
          fill='none'
          height='24'
          viewBox='0 0 24 24'
          width='24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='m21.5 14.0784c-1.1997.6405-2.5699 1.0037-4.0249 1.0037-4.726 0-8.55718-3.8312-8.55718-8.55725 0-1.45499.36313-2.82517 1.00371-4.02485-4.25398.99698-7.42163 4.81513-7.42163 9.3731 0 5.3168 4.3101 9.6269 9.6269 9.6269 4.558 0 8.3761-3.1676 9.3731-7.4216z'
            
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
          />
        </Svg>
      )}
    </StyledDiv>
  );
}

export default ThemeSwitcher;
