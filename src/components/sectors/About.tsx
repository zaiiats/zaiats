import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledWrapper = styled.div`
  //height: calc(100dvh - 2rem);
  padding: 5rem 3rem 5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(9, 1fr);
    padding: 4rem 0.5rem 4rem;
  }

  @media (max-width: 500px) {
    gap: 0.25rem;
  }

  @media (max-width: 350px) {
    grid-template-rows: repeat(11, 1fr);
  }
`;

const Stat = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.45rem;
  border: 1px solid var(--grey-color-light);
  border-radius: 8px;
  width: 100%;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--main-color);
  font-family: "Eurostyle";
  line-break: anywhere;
  text-align: center;

  @media (max-width: 550px) {
    font-size: 1rem;
  }
`;

const StatKey = styled.div`
  font-size: 0.9rem;
  opacity: 0.7;

  @media (max-width: 550px) {
    font-size: 0.55rem;
  }
`;

const Description = styled.div`
  grid-column: span 3;
  grid-row: span 2;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  line-height: 1.75rem;
  padding: 2rem;
  backdrop-filter: blur(6px);
  border-radius: 10px;
  border: 1px solid var(--grey-color-light);
  text-indent: 2rem;
  gap: 0.5rem;

  @media (max-width: 900px) {
    grid-column: span 1;
    grid-row: span 3;
  }

  @media (max-width: 550px) {
    font-size: 0.85rem;
    line-height: 1rem;
  }

  @media (max-width: 350px) {
    grid-row: span 5;
  }
`;

export default function About() {
  const { t } = useTranslation();
  return (
    <StyledWrapper>
      <Stat>
        <StatValue>11</StatValue>
        <StatKey>{t("about.stats.courses")}</StatKey>
      </Stat>

      <Stat>
        <StatValue>7</StatValue>
        <StatKey>{t("about.stats.projects")}</StatKey>
      </Stat>

      <Stat>
        <StatValue>2+</StatValue>
        <StatKey>{t("about.stats.years")}</StatKey>
      </Stat>

      <Description>
        <p>{t("about.text.paragraph1")}</p>
        <p>{t("about.text.paragraph2")}</p>
      </Description>

      <Stat>
        <StatValue>@zaiiats</StatValue>
        <StatKey>{t("about.stats.instagram")}</StatKey>
      </Stat>

      <Stat>
        <StatValue>@zaiiats</StatValue>
        <StatKey>{t("about.stats.telegram")}</StatKey>
      </Stat>

      <Stat>
        <StatValue style={{ fontSize: "1rem" }}>
          zaiatsoleksandry@gmail.com
        </StatValue>
        <StatKey>{t("about.stats.email")}</StatKey>
      </Stat>
    </StyledWrapper>
  );
}
