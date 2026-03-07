import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { projects } from "../../data/projects";
import { COURSES } from "../../data/courses";

const StyledWrapperContent = styled.div`
  padding: 5rem 2rem 0rem;
  width: 100%;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 550px) {
    padding: 5rem 1rem 3rem;
  }
`;

const Inner = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 1rem;
  max-width: 80rem;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(9, 1fr);
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
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 30px var(--course-card-shadow);
    border-color: var(--accent-color);
  }
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
    <StyledWrapperContent>
      <Inner>
        <Stat>
          <StatValue
            onClick={() => {
              window.open("https://www.instagram.com/zaiiats/");
            }}
          >
            @zaiiats
          </StatValue>
          <StatKey>{t("about.stats.instagram")}</StatKey>
        </Stat>

        <Stat>
          <StatValue
            onClick={() => {
              window.open("https://t.me/zaiiats/");
            }}
          >
            @zaiiats
          </StatValue>
          <StatKey>{t("about.stats.telegram")}</StatKey>
        </Stat>

        <Stat>
          <StatValue
            onClick={() => {
              window.location.href = "mailto:zaiatsoleksandry@gmail.com";
            }}
            style={{ fontSize: "1rem" }}
          >
            zaiatsoleksandry@gmail.com
          </StatValue>
          <StatKey>{t("about.stats.email")}</StatKey>
        </Stat>

        <Description>
          <p>{t("about.text.paragraph1")}</p>
          <p>{t("about.text.paragraph2")}</p>
        </Description>

        <Stat>
          <StatValue>{Object.values(projects).length}</StatValue>
          <StatKey>{t("about.stats.projects")}</StatKey>
        </Stat>

        <Stat>
          <StatValue>
            {Math.floor(
              (new Date().getTime() - new Date("2024-01-01").getTime()) /
                (1000 * 60 * 60 * 24 * 365.25),
            )}
            +
          </StatValue>
          <StatKey>{t("about.stats.years")}</StatKey>
        </Stat>

        <Stat>
          <StatValue>{Object.values(COURSES).length}</StatValue>
          <StatKey>{t("about.stats.courses")}</StatKey>
        </Stat>
      </Inner>
    </StyledWrapperContent>
  );
}
