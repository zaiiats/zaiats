import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle<{ theme: "light" | "dark" }>`
  :root {
    --main-color: ${({ theme }) => (theme === "light" ? "black" : "white")};
    --reverse-color: ${({ theme }) => (theme === "light" ? "white" : "black")};
    --bg-color: ${({ theme }) => (theme === "light" ? "#f0f0f0ff" : "#111")};
    --bg2-color: ${({ theme }) =>
      theme === "light" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.8)"};

    --grey-color: ${({ theme }) => (theme === "light" ? "#444" : "#aaa")};
    --grey-color-light: ${({ theme }) => (theme === "light" ? "#ccc" : "#444")};
    --grey-color-inv:${({ theme }) =>
      theme === "light" ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.2)"};

    --frame-color: ${({ theme }) =>
      theme === "light" ? "#757575ff" : "black"};
    --project-card-overlay:${({ theme }) =>
      theme === "light"
        ? "linear-gradient(to top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))"
        : "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4))"};
    --course-card-shadow: ${({ theme }) =>
      theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.9)"};

    --accent-color: ${({ theme }) =>
      theme === "light" ? "#58289f" : "#58289f"};
    --accent-color-high:#391a68;
    --text-color: ${({ theme }) => (theme === "light" ? "#000000" : "#f0f0f0")};

    --nav-bg-color:${({ theme }) =>
      theme === "light" ? "rgba(255, 255, 255, 0.3)" : "rgba(0,0,0,0.3)"};
    --image-overlay:${({ theme }) =>
      theme === "light" ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.9)"};

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
