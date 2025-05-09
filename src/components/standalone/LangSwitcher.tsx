import { useState } from 'react';
import styled from 'styled-components';
import { useLangContext } from '../../hooks/useLangContext';

const Wrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 3rem;
  z-index: 193;
  user-select: none;
`;

const Toggle = styled.button`
  background: transparent;
  color: var(--main-color);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  padding: 0.3rem 0.8rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background: var(--accent-color);
  }
`;

const Dropdown = styled.ul`
  margin: 0;
  padding: 0.3rem 0;
  list-style: none;
  background: var(--reverse-color);
  border-radius: 5px;
  position: absolute;
  bottom: 120%;
  right: 0;
  min-width: 100%;
  box-shadow: 0 0 10px var(--grey-color);
  transition:var(--transition);
`;

const Option = styled.li`
  color: var(--main-color);
  padding: 0.3rem 0.8rem;
  font-size: 0.95rem;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: var(--grey-color-light);
  }
`;

function LangSwitcher() {
  const { lang, changeLang } = useLangContext();
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);
  const selectLang = (newLang: Language) => {
    changeLang(newLang);
    setOpen(false);
  };

  return (
    <Wrapper>
      <Toggle onClick={toggleDropdown}>{lang.toUpperCase()}</Toggle>
      {open && (
        <Dropdown>
          {lang !== 'en' && (
            <Option onClick={() => selectLang('en')}>EN</Option>
          )}
          {lang !== 'uk' && (
            <Option onClick={() => selectLang('uk')}>UK</Option>
          )}
        </Dropdown>
      )}
    </Wrapper>
  );
}

export default LangSwitcher;
