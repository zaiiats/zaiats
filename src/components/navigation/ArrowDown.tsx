import { useEffect, useState, type MouseEvent } from "react";
import styled, { keyframes } from "styled-components";
import { smoothScrollTo } from "../../scripts/navigation";

const bounce = keyframes`
  0%, 100% {
    transform: translate(-50%, -20px);
  }
  50% {
    transform: translate(-50%, -10px);
  }
`;

const ArrowDownD = styled.div<{ $visible: boolean }>`
  position: fixed;
  width: 6vw;
  height: 1.5rem;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 193;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  transition: opacity 0.2s ease;

  animation: ${bounce} 1.5s infinite;
`;

const ArrowContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  width: 100%;
`;

const Svg = styled.svg`
  stroke: var(--main-color);
  transition: var(--transition);

  &:hover {
    stroke: var(--accent-color);
  }
`;

function ArrowDown() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    smoothScrollTo("projects");
  };

  useEffect(() => {
    const container = document.getElementById("mainContainer");
    if (!container) return;

    const onScroll = () => {
      setIsScrolled(container.scrollTop > 0);
    };

    container.addEventListener("scroll", onScroll);

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <ArrowDownD $visible={!isScrolled}>
      <ArrowContainer>
        <a href="projects" onClick={handleClick}>
          <Svg
            fill="none"
            height="2rem"
            viewBox="0 0 24 24"
            width="2rem"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="m6 12.5 5.3243 4.8806c.3208.2941.4812.4411.6757.4411s.3549-.147.6757-.4411l5.3243-4.8806" />
              <path d="m6 6 5.3243 4.8806c.3208.2941.4812.4411.6757.4411s.3549-.147.6757-.4411l5.3243-4.8806" />
            </g>
          </Svg>
        </a>
      </ArrowContainer>
    </ArrowDownD>
  );
}

export default ArrowDown;
