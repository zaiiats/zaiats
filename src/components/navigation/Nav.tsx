import { useEffect, useState, type MouseEvent } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { useScrollOrNavigate } from "../../hooks/useScrollOrNavigate";
import { useTranslation } from "react-i18next";

const StyledNav = styled.nav<{ $scrolled: boolean }>`
  padding: 0 1rem;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  font-family: "Eurostyle";
  font-size: 0.8rem;
  z-index: 100;
  color: var(--main-color);
  transition: backdrop-filter 0.3s ease, background-color 0.3s ease;

  ${({ $scrolled }) =>
    $scrolled &&
    `
      backdrop-filter: blur(10px);
      background-color: rgba(0,0,0,0.3);
    `}
`;

const NavLink = styled.a`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  align-self: stretch;
  user-select: none;

  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s linear;

  &:hover {
    color: var(--grey-color);
  }

  @media (hover: none) {
    &:hover {
      color: var(--main-color);
      background-color: transparent;
    }
  }
`;

function Nav() {
  const { scrollOrNavigate } = useScrollOrNavigate();
  const { t } = useTranslation();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const container = document.getElementById("mainContainer");
    if (!container) return;

    const onScroll = () => {
      setScrolled(container.scrollTop > 0);
    };
    onScroll();

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollOrNavigate("/", id);
  };

  return (
    <StyledNav $scrolled={scrolled}>
      <NavLink href="#projects" onClick={(e) => handleClick(e, "projects")}>
        {t("nav.projects")}
      </NavLink>

      <Logo />

      <NavLink href="#about" onClick={(e) => handleClick(e, "about")}>
        {t("nav.about")}
      </NavLink>
    </StyledNav>
  );
}

export default Nav;
