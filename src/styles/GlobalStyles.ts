import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle<{ theme: 'light' | 'dark' }>`
  :root {
    --main-color: ${({ theme }) => (theme === 'light' ? 'black' : 'white')};
    --reverse-color: ${({ theme }) => (theme === 'light' ? 'white' : 'black')};
    --bg-color: ${({ theme }) => (theme === 'light' ? '#ddd' : '#111')};
    --bg2-color: ${({ theme }) =>
      theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.8)'};

    --grey-color: ${({ theme }) => (theme === 'light' ? '#444' : '#aaa')};
    --grey-color-light: ${({ theme }) => (theme === 'light' ? '#ccc' : '#444')};

    --frame-color: ${({ theme }) => (theme === 'light' ? '#aaa' : 'black')};

    --accent-color: ${({ theme }) => (theme === 'light' ? '#58289f' : '#58289f')};
    --accent-color-high:#391a68;
    --text-color: ${({ theme }) => (theme === 'light' ? '#000000' : '#f0f0f0')};

    --transition : all 0.15s ease-in-out;
  }

  body {
    background-color: var(--bg-color);
    color: var(--text-color);
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    transition: background-color 0.3s, color 0.3s;
  }
`;

export default GlobalStyles;
