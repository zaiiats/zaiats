import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { COURSES } from "../../data/courses";
import { PROJECT_SECTIONS } from "../../data/projectSec";
import { useScrollOrNavigate } from "../../hooks/useScrollOrNavigate";
import { useTranslation } from "react-i18next";

const StyledWrapper = styled.div`
  padding: 5rem 2rem 3rem;
  width: 100%;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 550px) {
    padding: 5rem 1rem 3rem;
  }
`;

const Inner = styled.div`
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
`;

const TopicContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.h1`
  font-size: 1.2rem;
  padding-left: 2rem;
  font-family: "Eurostyle";
  font-weight: 500;
`;

const ScrollArea = styled.div`
  position: relative;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 0.5rem;
  border-radius: 999px;
  border: 1px solid var(--grey-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: all 0.2s ease-in-out;
  opacity: 0;
  pointer-events: none;
  z-index: 2;
  padding: 0.5rem;
  background-color: var(--main-color);

  ${ScrollArea}:hover & {
    opacity: 1;
    pointer-events: auto;
  }

  svg {
    width: 1rem;
    height: 1rem;

    path {
      fill: var(--reverse-color);
    }
  }

  @media (max-width: 900px) {
    opacity: 1;
    pointer-events: auto;
    padding: 0.55rem;

    svg {
      width: 0.75rem;
      height: 0.75rem;
    }
  }

  &:hover {
    background: var(--accent-color);

    svg path {
      fill: white;
    }
  }
`;

const ArrowLeft = styled(ArrowButton)`
  left: 0.5rem;

  svg {
    transform: rotate(0deg);
    transform-origin: center;
  }
`;

const ArrowRight = styled(ArrowButton)`
  right: 0.5rem;

  svg {
    transform: rotate(180deg);
    transform-origin: center;
  }
`;

const ProjectsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--grey-color-inv);
    border-radius: 999px;
  }

  @media screen and (max-width: 550px) {
    gap: 0.5rem;
  }
`;

const ProjectCard = styled.div`
  position: relative;
  height: 15rem;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover div[data-overlay="true"] {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 900px) {
    div[data-overlay="true"] {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 850px) {
    height: 10rem;
  }

  @media screen and (max-width: 550px) {
    height: 7rem;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Overlay = styled.div.attrs(() => ({ "data-overlay": "true" } as any))`
  position: absolute;
  inset: 0;
  background: var(--project-card-overlay);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.25s ease, transform 0.25s ease;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: var(--main-color);
`;

const ProjectName = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;

  @media (max-width: 550px) {
    font-size: 1rem;
  }
`;

const ProjectText = styled.p`
  font-size: 0.85rem;
  opacity: 0.9;

  @media (max-width: 550px) {
    font-size: 0.6rem;
  }
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  padding: 0 0rem 0 0rem;

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.75rem;
  }
`;

const CourseCard = styled.a`
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--grey-color-light);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 30px var(--course-card-shadow);
    border-color: var(--accent-color);
  }
`;

const CourseThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CourseBody = styled.div`
  padding: 0.75rem 0.85rem 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const CourseName = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--main-color);
`;

const CourseMeta = styled.p`
  font-size: 0.75rem;
  opacity: 0.8;
  color: var(--grey-color);
`;

export default function Projects() {
  const { scrollOrNavigate } = useScrollOrNavigate();
  const { t } = useTranslation();
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [canScroll, setCanScroll] = useState<boolean[]>([]);

  useEffect(() => {
    const checkScrollability = () => {
      setCanScroll(
        scrollRefs.current.map((el) =>
          el ? el.scrollWidth > el.clientWidth : false
        )
      );
    };

    checkScrollability();
    window.addEventListener("resize", checkScrollability);

    return () => window.removeEventListener("resize", checkScrollability);
  }, []);

  const handleScroll = (index: number, direction: "left" | "right") => {
    const container = scrollRefs.current[index];
    if (!container) return;

    const amountPx = 30 * 16;
    container.scrollBy({
      left: direction === "left" ? -amountPx : amountPx,
      behavior: "smooth",
    });
  };

  return (
    <StyledWrapper>
      <Inner>
        {PROJECT_SECTIONS.map((section, sectionIndex) => (
          <TopicContainer key={section.name}>
            <Label>{t(`projects.${section.name}`)}</Label>

            <ScrollArea>
              {canScroll[sectionIndex] && (
                <>
                  <ArrowLeft onClick={() => handleScroll(sectionIndex, "left")}>
                    {arrowSvg}
                  </ArrowLeft>
                  <ArrowRight
                    onClick={() => handleScroll(sectionIndex, "right")}
                  >
                    {arrowSvg}
                  </ArrowRight>
                </>
              )}

              <ProjectsContainer
                ref={(el) => {
                  scrollRefs.current[sectionIndex] = el;
                }}
              >
                {section.projects.map((project, idx) => (
                  <ProjectCard
                    onClick={() => scrollOrNavigate(project.url)}
                    key={`${section.name}-${idx}`}
                  >
                    <Thumbnail src={project.thumbnailImage} alt={project.key} />
                    <Overlay>
                      <Description>
                        <ProjectName>
                          {t(`projects.${project.key}.label`)}
                        </ProjectName>
                        <ProjectText>
                          {t(`projects.${project.key}.description`)}
                        </ProjectText>
                      </Description>
                    </Overlay>
                  </ProjectCard>
                ))}
              </ProjectsContainer>
            </ScrollArea>
          </TopicContainer>
        ))}

        <TopicContainer>
          <Label>{t("projects.courses")}</Label>
          <CoursesGrid>
            {COURSES.map((c, i) => (
              <CourseCard key={i} target="_blank" href={c.url}>
                <CourseThumbnail src={c.image} alt={c.name} />
                <CourseBody>
                  <CourseName>{c.name}</CourseName>
                  <CourseMeta>
                    {c.hours} {t("projects.hours")}
                  </CourseMeta>
                </CourseBody>
              </CourseCard>
            ))}
          </CoursesGrid>
        </TopicContainer>
      </Inner>
    </StyledWrapper>
  );
}

const arrowSvg = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {" "}
    <path d="M10.995 5.00409H3.40501L6.70501 1.71409C6.89332 1.52579 6.9991 1.27039 6.9991 1.00409C6.9991 0.73779 6.89332 0.482395 6.70501 0.294092C6.51671 0.105788 6.26132 0 5.99501 0C5.72871 0 5.47332 0.105788 5.28501 0.294092L0.285014 5.29409C0.193973 5.3892 0.122608 5.50134 0.0750135 5.62409C-0.0250045 5.86755 -0.0250045 6.14063 0.0750135 6.38409C0.122608 6.50684 0.193973 6.61899 0.285014 6.71409L5.28501 11.7141C5.37798 11.8078 5.48858 11.8822 5.61044 11.933C5.7323 11.9838 5.863 12.0099 5.99501 12.0099C6.12703 12.0099 6.25773 11.9838 6.37959 11.933C6.50145 11.8822 6.61205 11.8078 6.70501 11.7141C6.79874 11.6211 6.87314 11.5105 6.9239 11.3887C6.97467 11.2668 7.00081 11.1361 7.00081 11.0041C7.00081 10.8721 6.97467 10.7414 6.9239 10.6195C6.87314 10.4977 6.79874 10.3871 6.70501 10.2941L3.40501 7.00409H10.995C11.2602 7.00409 11.5146 6.89873 11.7021 6.7112C11.8897 6.52366 11.995 6.26931 11.995 6.00409C11.995 5.73888 11.8897 5.48452 11.7021 5.29699C11.5146 5.10945 11.2602 5.00409 10.995 5.00409Z" />{" "}
  </svg>
);
