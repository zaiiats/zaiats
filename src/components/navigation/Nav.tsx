import { type MouseEvent } from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import { useScrollOrNavigate } from '../../hooks/useScrollOrNavigate';
import { useTranslation } from 'react-i18next';

const StyledNav = styled.nav`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 97%;
  height: 3rem;
  display: flex;
  align-items: center;
  font-family: 'Eurostyle';
  font-size: 0.8rem;
  z-index: 100;
  color: var(--main-color);
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

  &:active {
    transform: scale(0.98);
  }

  @media (hover: none) {
    &:hover {
      color: var(--main-color);
      background-color: transparent;
    }
  }
`;

function Nav() {
  const {scrollOrNavigate} = useScrollOrNavigate()
  const {t} = useTranslation();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollOrNavigate('/', id);
  };

  return (
    <StyledNav>
      <NavLink href='#projects' onClick={(e) => handleClick(e, 'projects')}>
        {t('projects')}
      </NavLink>

      <Logo />

      <NavLink href='#about' onClick={(e) => handleClick(e, 'about')}>
        {t('about')}
      </NavLink>
    </StyledNav>
  );
}

export default Nav;
