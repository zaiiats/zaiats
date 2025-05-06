import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Montserrat variable */
  @font-face {
    font-family: 'Montserrat';
    src:
      url('/fonts/Montserrat/Montserrat-VariableFont_wght.ttf') format('truetype');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }

  /* Eurostyle regular */
  @font-face {
    font-family: 'Eurostyle';
    src:
      url('/fonts/Eurostyle.ttf')    format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

`;
export default GlobalStyles;
