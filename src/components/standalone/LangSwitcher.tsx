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
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  padding: 0.3rem 0.8rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0000ff;
  }
`;

const Dropdown = styled.ul`
  margin: 0;
  padding: 0.3rem 0;
  list-style: none;
  background: #222;
  border-radius: 5px;
  position: absolute;
  bottom: 120%;
  right: 0;
  min-width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const Option = styled.li`
  color: white;
  padding: 0.3rem 0.8rem;
  font-size: 0.95rem;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #444;
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
