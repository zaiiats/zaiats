import styled, { keyframes } from "styled-components";
import MainText from "../text/MainText";
import SecondaryText from "../text/SecondaryText";
import Button from "../reusable/Button";
import { useScrollOrNavigate } from "../../hooks/useScrollOrNavigate";
import { useTranslation } from "react-i18next";
import { images } from "../../data/images";
import { skills } from "../../data/skills";

const StyledSection = styled.section`
  height: calc(100dvh - 2rem);
  padding: 0 2rem 2rem;
  display: grid;
  flex-direction: row;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5rem;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const TextContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: 0 auto;
  gap: 2rem;
  width: 100%;
  max-width: 70%;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ImageContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 30px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @keyframes move-left {
    0% {
      transform: rotate(2deg) translateX(-400px);
    }
    100% {
      transform: rotate(2deg) translateX(400px);
    }
  }

  @keyframes move-right {
    0% {
      transform: rotate(2deg) translateX(400px);
    }
    100% {
      transform: rotate(2deg) translateX(-400px);
    }
  }

  > div:nth-child(odd) {
    animation: move-left 62s ease-in-out infinite alternate;
  }

  > div:nth-child(even) {
    animation: move-right 62s ease-in-out infinite alternate;
  }
`;

const ImageColumn = styled.div`
  opacity: 0.2;
  display: flex;
  gap: 30px;
  width: auto;
  height: 20dvh;
`;

const Image = styled.img`
  height: 100%;
`;

const scrollSkills = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  background-color: var(--accent-color);
  position: absolute;
  bottom: 4rem;
  left: 0;
  width: 100%;
  overflow: hidden;
  padding: 8px 16px;
  justify-content: flex-start;
  align-items: center;
`;

const SkillsRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  white-space: nowrap;
  width: max-content;

  animation: ${scrollSkills} 32s linear infinite;
`;

const Skill = styled.span`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 0.75rem;
  opacity: 0.9;
`;

function Hero() {
  const { scrollOrNavigate } = useScrollOrNavigate();
  const { t } = useTranslation();

  return (
    <StyledSection>
      <ActionContainer>
        <TextContainer>
          <MainText size="huge">{t("hello")}</MainText>
          <SecondaryText size="medium">
            {t("i")} {t("oleksandr")} – {t("heroText")}
          </SecondaryText>
        </TextContainer>
        <ButtonContainer>
          <Button
            onClick={() => scrollOrNavigate("/", "about")}
            text={t("writeMe")}
            style="main"
          />
        </ButtonContainer>
      </ActionContainer>
      <ImageContainer>
        {images.map((imageColumn, i) => (
          <ImageColumn key={`imageColumn-${i}`}>
            {imageColumn.map((image, j) => (
              <Image src={image} key={`image-${i}-${j}`} />
            ))}
          </ImageColumn>
        ))}
      </ImageContainer>
      <SkillsContainer>
        <SkillsRow>
          {[...skills, ...skills].map((skill, i) => (
            <Skill key={i}>
              {skill} <span>{"•"}</span>
            </Skill>
          ))}
        </SkillsRow>
      </SkillsContainer>
    </StyledSection>
  );
}

export default Hero;
