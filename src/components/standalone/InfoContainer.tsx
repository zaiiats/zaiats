import styled from "styled-components";
import { useScrollOrNavigate } from "../../hooks/useScrollOrNavigate";
import type { MouseEvent } from "react";

const StyledDiv = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 1fr 1.5fr;
`;

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const InfoHeader = styled.header`
  font-family: "Eurostyle";
  padding-left: 2rem;
  color: var(--accent-color);
`;

const SkillSetData = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  gap: 1rem;
  padding: 1rem 0;
`;

const Skill = styled.div<{ $color: string }>`
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--main-color);
  font-weight: 600;
  transition: var(--transition);
  user-select: none;
  border: 0.2rem solid var(--frame-color);

  &:hover {
    box-shadow: 0 0 20px var(--bg2-color);
    background: ${({ $color }) => $color};
  }
`;

const ProjectsGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  gap: 1rem;
  padding: 1rem 0;
  transition: all 0.15s ease-in-out;
`;

const ProjectItem = styled.a`
  position: relative;
  background: var(--reverse-color);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  overflow: hidden;
  color: var(--main-color);
  transition: var(--transition);

  transition: all 0.15s ease-in-out;

  &:hover {
    box-shadow: 0 0 20px var(--bg2-color);
    transform: translateY(-4px);
  }
`;

const ProjectImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  flex: 1;
  transition: all 0.15s ease-in-out;
`;

const ProjectName = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  font-size: 0.9rem;
  height: 100%;
  width: 100%;
  font-weight: 600;
  background-color: var(--bg2-color);
  text-align: center;
  transition: all 0.15s ease-in-out;
  opacity: 1;
  color: var(--main-color);

  &:hover {
    opacity: 0;
  }
`;

function InfoContainer({
  skills,
  projects,
  type,
}: {
  skills: Skill[];
  projects: Project[];
  type: string;
}) {
  const { scrollOrNavigate } = useScrollOrNavigate();

  const handleClick = (e: MouseEvent, url: string) => {
    e.preventDefault();
    scrollOrNavigate(`/${url}`, url);
  };

  return (
    <StyledDiv>
      {/* ------- SKILLS ------- */}
      <Container>
        <InfoHeader>Skills in {type} development</InfoHeader>
        <SkillSetData>
          {skills.map((sk) => (
            <Skill key={sk.name} $color={sk.color}>
              {sk.name}
            </Skill>
          ))}
        </SkillSetData>
      </Container>

      <Container>
        <InfoHeader>Projects</InfoHeader>
        <ProjectsGrid>
          {projects.map((pr) => (
            <ProjectItem
              key={pr.name}
              onClick={(e) => handleClick(e, pr.url)}
              href={`/${pr.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ProjectImg src={`/images/${pr.url}.png`} alt={pr.name} />
              <ProjectName>{pr.name}</ProjectName>
            </ProjectItem>
          ))}
        </ProjectsGrid>
      </Container>
    </StyledDiv>
  );
}

export default InfoContainer;
