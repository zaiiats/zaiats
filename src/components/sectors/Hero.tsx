import styled from 'styled-components';
import MainText from '../text/MainText';
import SecondaryText from '../text/SecondaryText';
import Button from '../reusable/Button';
import { useScrollOrNavigate } from '../../hooks/useScrollOrNavigate';
import { useTranslation } from 'react-i18next';

/* Keyframes must be defined separately */
import { keyframes } from 'styled-components';

const scaleAndRotate = keyframes`
  0% {
    transform: scale(0.7) rotate(70deg);
  }
  50% {
    transform: scale(0.7) rotate(70deg);
  }
  100% {
    transform: scale(0.7) rotate(70deg);
  }
`;

const StyledSection = styled.section`
  padding: 0 2rem 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 70%;
`;

const ImageContainer = styled.div`
  display: flex;
  padding: 5vw;
`;

const Img = styled.img`
  height: auto;
  max-width: 100%;
`;

const ImgBackground = styled.img`
  position: absolute;
  object-fit: cover;
  width: 200%;
  animation: ${scaleAndRotate} 20s infinite linear;
  z-index: -1;
  box-shadow: 0 0 500px var(--accent-color);
`;

const Div = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Hero() {
  const { scrollOrNavigate } = useScrollOrNavigate();
  const { t } = useTranslation();

  return (
    <StyledSection>
      <ActionContainer>
        <TextContainer>
          <MainText size='huge'>
            {t('hello')}
          </MainText>
          <SecondaryText size='small'>
            {t('i')} <span>{t('oleksandr')}</span> – {t('heroText')}
          </SecondaryText>
        </TextContainer>
        <Button
          onClick={() => scrollOrNavigate('/', 'about')}
          text={t('writeMe')}
          style='main'
        />
      </ActionContainer>
      <ImageContainer>
        <Div>
          <ImgBackground src='./images/ellipse1.png' alt='avatar' />
          <Img src='./images/avatar.png' alt='avatar' />
        </Div>
      </ImageContainer>
    </StyledSection>
  );
}

export default Hero;
