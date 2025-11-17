import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { projects } from "../data/projects";
import { useScrollOrNavigate } from "../hooks/useScrollOrNavigate";
import { useTranslation } from "react-i18next";

export interface Project {
  name: string;
  description: string;
  skills: string[];
  solo: boolean;
  url: string | false;
  thumbnail: string;
  images: string[];
  durationMonths: number;
  isSolo: boolean;
  isDesigned: boolean;
  year: number;
  warningText?: string;
}

type ProjectKey = keyof typeof projects;

const StyledSection = styled.section`
  padding: 3rem 0rem 4rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ProjectThumbnail = styled.div<{ $thumbnailSrc: string }>`
  width: 100%;
  height: 20rem;
  background-image: url(${({ $thumbnailSrc }) => $thumbnailSrc});
  background-size: cover;
  background-position: center;
  opacity: 0.5;
`;

const ProjectInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem 1rem;
`;

const ProjectName = styled.div`
  width: 100%;
  gap: min(1vw, 1rem);
  position: absolute;
  font-size: min(6vw, 4rem);
  transform: translate(0rem, calc(-50% - 1rem));
  display: flex;
  align-items: center;
  font-family: "Eurostyle";
`;

const BackSvg = styled.span`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 1rem;

  svg {
    height: 2rem;
    width: 2rem;

    path {
      fill: var(--main-color);
    }
  }

  @media screen and (max-width: 850px) {
    padding: 0.5rem;
    svg {
      height: 1rem;
      width: 1rem;
    }
  }
`;

const Warning = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  border: 1px solid #979726;
  border-radius: 10px;
  max-width: 40rem;
  align-self: center;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  color: #979726;
  margin: 4rem 0 0;

  svg {
    height: 2rem;
    width: 2rem;
    path {
      fill: #979726;
    }
  }

  @media screen and (max-width: 850px) {
    font-size: 0.85rem;

    margin: 2rem 0 0;
  }
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: max-content;
  font-size: 1.25rem;
  transition: all 0.15s ease-in-out;

  p {
    color: #9999fb;
  }

  &:hover {
    text-decoration: underline;
  }

  svg {
    path {
      fill: #9999fb;
    }
  }

  @media screen and (max-width: 850px) {
    font-size: 1rem;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  text-indent: 1.5rem;
  margin-top: 0.5rem;

  h3 {
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 120%;
    margin-bottom: 0.25rem;

    @media screen and (max-width: 850px) {
      font-size: 1rem;
      line-height: 120%;
      margin-bottom: 0.15rem;
    }
  }

  p {
    line-height: 150%;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;

    @media screen and (max-width: 850px) {
      line-height: 150%;
      font-size: 0.85rem;
      margin-bottom: 1rem;
    }
  }

  @media screen and (max-width: 850px) {
    text-indent: 1rem;
  }
`;

const Label = styled.p`
  margin: 3rem 1rem 1rem;
  font-family: "Eurostyle";
  font-size: 2rem;

  @media screen and (max-width: 850px) {
    font-size: 1.5rem;

    margin: 2rem 0.75rem 0.75rem;
  }
`;

const Skills = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media screen and (max-width: 850px) {
    gap: 0.25rem;
  }
`;

const Item = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--grey-color-light);
  background-color: var(--reverse-color);
  font-size: 0.95rem;
  opacity: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  border-radius: 10px;

  @media screen and (max-width: 850px) {
    padding: 0.5rem 0.85rem;
    font-size: 0.75rem;
  }
`;

const PhotosGallery = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  @media screen and (max-width: 850px) {
    gap: 1rem;
  }
`;

const Image = styled.img`
  width: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 25px var(--image-overlay);
  }
`;

const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: var(--image-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const LightboxContent = styled.div`
  position: relative;
  width: calc(100vw - 12rem);
  height: 60vh;

  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 850px) {
    width: calc(100vw - 8rem);
  }
`;

const LightboxImage = styled.img`
  max-width: 100%;
  max-height: 60vh;
  border-radius: 1rem;
  border: 1px solid #ffffff33;
  object-fit: contain;

  @media screen and (max-width: 850px) {
    border-radius: 0.5rem;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: var(--main-color);
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  cursor: pointer;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  &:hover {
    background: rgba(30, 64, 175, 0.9);
  }

  svg {
    path {
      fill: var(--reverse-color);
    }
  }

  @media screen and (max-width: 850px) {
    width: 2rem;
    height: 2rem;
  }
`;

const ArrowLeft = styled(ArrowButton)`
  left: -4rem;

  @media screen and (max-width: 850px) {
    left: -3rem;
  }
`;

const ArrowRight = styled(ArrowButton)`
  right: -4rem;
  transform: translateY(-50%) rotate(180deg);

  @media screen and (max-width: 850px) {
    right: -3rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -3.5rem;
  right: 0;
  border: none;
  background: var(--main-color);
  color: var(--reverse-color);
  border-radius: 999px;
  cursor: pointer;
  font-size: 1.5rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(220, 38, 38, 0.9);
  }

  @media screen and (max-width: 850px) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }
`;

function Project() {
  const { projectName } = useParams();
  const { scrollOrNavigate } = useScrollOrNavigate();
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const project = (
    projectName ? projects[projectName as ProjectKey] : undefined
  ) as Project;

  const openImage = (index: number) => {
    setActiveIndex(index);
  };

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + project?.images.length) % project?.images.length
    );
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % project?.images.length
    );
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
        return;
      }

      if (activeIndex === null) return;

      if (e.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % project?.images.length
        );
      }

      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + project?.images.length) % project?.images.length
        );
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, project?.images.length]);

  if (!project) {
    return <></>;
  }

  return (
    <StyledSection>
      <ProjectThumbnail $thumbnailSrc={project.thumbnail} />
      <ProjectInfo>
        <ProjectName>
          <BackSvg onClick={() => scrollOrNavigate("/", "projects")}>
            {arrowSvg}
          </BackSvg>
          {t(`project.${projectName}.label`)}
        </ProjectName>

        {t(`project.${projectName}.warningText`) && (
          <Warning>
            {warningSvg}
            {t(`project.${projectName}.warningText`)}
          </Warning>
        )}

        {project.skills && (
          <>
            <Label>{t("project.labels.skills")}</Label>
            <Skills>
              {project.skills.map((s: string, i: number) => (
                <Item key={`skill-${i}`}>{s}</Item>
              ))}
            </Skills>
            <Skills style={{ marginTop: "1.75rem" }}>
              <Item>
                {project.isSolo ? t("project.own") : t("project.team")}
              </Item>
              <Item>
                {project.isDesigned
                  ? t("project.ownDesign")
                  : t("project.someonesDesign")}
              </Item>
              <Item>
                {project.year} {t("project.year")}
              </Item>
              <Item>
                {t("project.duration")} {project.durationMonths}{" "}
                {t("project.months")}
              </Item>
            </Skills>
          </>
        )}

        {project.url && (
          <>
            <Label>{t("project.labels.link")}</Label>
            <Link target="_blank" href={project.url}>
              <p>{project.url}</p>
              {linkSvg}
            </Link>
          </>
        )}
        <Label>{t("project.labels.description")}</Label>
        <Description
          dangerouslySetInnerHTML={{
            __html: t(`project.${projectName}.description`),
          }}
        />
        <Label>{t("project.labels.gallery")}</Label>
        <PhotosGallery>
          {project.images.map((image: string, i: number) => (
            <Image
              key={`image-${i}`}
              src={image}
              alt={`Скріншот ${i + 1}`}
              onClick={() => openImage(i)}
            />
          ))}
        </PhotosGallery>
      </ProjectInfo>

      {activeIndex !== null && (
        <LightboxOverlay onClick={closeLightbox}>
          <LightboxContent onClick={(e) => e.stopPropagation()}>
            <LightboxImage
              src={project.images[activeIndex]}
              alt={`Скріншот ${activeIndex + 1}`}
            />
            {project.images.length > 1 && (
              <>
                <ArrowLeft onClick={showPrev}>{arrowSvg}</ArrowLeft>
                <ArrowRight onClick={showNext}>{arrowSvg}</ArrowRight>
              </>
            )}
            <CloseButton onClick={closeLightbox}>✕</CloseButton>
          </LightboxContent>
        </LightboxOverlay>
      )}
    </StyledSection>
  );
}

export default Project;

const warningSvg = (
  <svg
    width="23"
    height="21"
    viewBox="0 0 23 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.0395 14.0686C10.8417 14.0686 10.6484 14.1273 10.4839 14.2372C10.3195 14.347 10.1913 14.5032 10.1156 14.6859C10.04 14.8687 10.0201 15.0697 10.0587 15.2637C10.0973 15.4577 10.1926 15.6359 10.3324 15.7757C10.4723 15.9156 10.6504 16.0108 10.8444 16.0494C11.0384 16.088 11.2395 16.0682 11.4222 15.9925C11.6049 15.9168 11.7611 15.7887 11.871 15.6242C11.9809 15.4598 12.0395 15.2664 12.0395 15.0686C12.0395 14.8034 11.9342 14.5491 11.7466 14.3615C11.5591 14.174 11.3047 14.0686 11.0395 14.0686ZM21.7095 15.5386L13.6595 1.53863C13.3993 1.07215 13.0193 0.683589 12.5587 0.4131C12.0981 0.142611 11.5737 0 11.0395 0C10.5054 0 9.98092 0.142611 9.52033 0.4131C9.05973 0.683589 8.67971 1.07215 8.41952 1.53863L0.419518 15.5386C0.150314 15.9926 0.0056609 16.5097 0.000162801 17.0375C-0.0053353 17.5652 0.128516 18.0852 0.388204 18.5447C0.647892 19.0042 1.02422 19.3871 1.4792 19.6547C1.93418 19.9222 2.4517 20.065 2.97952 20.0686H19.0995C19.6316 20.0739 20.1554 19.9375 20.6174 19.6735C21.0794 19.4096 21.4629 19.0275 21.7285 18.5665C21.9941 18.1054 22.1324 17.582 22.129 17.05C22.1257 16.5179 21.9809 15.9963 21.7095 15.5386ZM19.9795 17.5386C19.8919 17.6946 19.764 17.8242 19.6092 17.9139C19.4544 18.0036 19.2784 18.0501 19.0995 18.0486H2.97952C2.80063 18.0501 2.62462 18.0036 2.46984 17.9139C2.31505 17.8242 2.18717 17.6946 2.09952 17.5386C2.01175 17.3866 1.96554 17.2142 1.96554 17.0386C1.96554 16.8631 2.01175 16.6906 2.09952 16.5386L10.0995 2.53863C10.1834 2.37483 10.3109 2.23736 10.468 2.14137C10.625 2.04538 10.8055 1.99459 10.9895 1.99459C11.1736 1.99459 11.354 2.04538 11.5111 2.14137C11.6681 2.23736 11.7956 2.37483 11.8795 2.53863L19.9295 16.5386C20.0287 16.6885 20.0857 16.8623 20.0945 17.0418C20.1033 17.2213 20.0636 17.3998 19.9795 17.5586V17.5386ZM11.0395 6.06863C10.7743 6.06863 10.5199 6.17399 10.3324 6.36152C10.1449 6.54906 10.0395 6.80341 10.0395 7.06863V11.0686C10.0395 11.3338 10.1449 11.5882 10.3324 11.7757C10.5199 11.9633 10.7743 12.0686 11.0395 12.0686C11.3047 12.0686 11.5591 11.9633 11.7466 11.7757C11.9342 11.5882 12.0395 11.3338 12.0395 11.0686V7.06863C12.0395 6.80341 11.9342 6.54906 11.7466 6.36152C11.5591 6.17399 11.3047 6.06863 11.0395 6.06863Z" />
  </svg>
);

const linkSvg = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.9258 0.62C11.8243 0.375651 11.6301 0.181475 11.3858 0.0799999C11.2656 0.028759 11.1365 0.00157999 11.0058 0H1.0058C0.740582 0 0.486228 0.105357 0.298692 0.292893C0.111155 0.48043 0.00579834 0.734784 0.00579834 1C0.00579834 1.26522 0.111155 1.51957 0.298692 1.70711C0.486228 1.89464 0.740582 2 1.0058 2H8.5958L0.295798 10.29C0.20207 10.383 0.127676 10.4936 0.0769072 10.6154C0.0261385 10.7373 0 10.868 0 11C0 11.132 0.0261385 11.2627 0.0769072 11.3846C0.127676 11.5064 0.20207 11.617 0.295798 11.71C0.388761 11.8037 0.499362 11.8781 0.621222 11.9289C0.743081 11.9797 0.873786 12.0058 1.0058 12.0058C1.13781 12.0058 1.26852 11.9797 1.39038 11.9289C1.51223 11.8781 1.62284 11.8037 1.7158 11.71L10.0058 3.41V11C10.0058 11.2652 10.1112 11.5196 10.2987 11.7071C10.4862 11.8946 10.7406 12 11.0058 12C11.271 12 11.5254 11.8946 11.7129 11.7071C11.9004 11.5196 12.0058 11.2652 12.0058 11V1C12.0042 0.869323 11.977 0.740222 11.9258 0.62Z" />
  </svg>
);

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
