import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import InfoContainer from '../standalone/InfoContainer';

const StyledSection = styled.section`
  display: flex;
  height: 100%;
  padding: 1rem 0 4rem;
`;

const CardContainer = styled.div<{ $opened: string | null; $us: string }>`
  display: flex;
  justify-content: stretch;
  width: ${({ $opened, $us }) =>
    $opened === null
      ? 'calc((100vw - 2rem - 5vw) / 3)'
      : $opened === $us
      ? 'calc(100vw - 2rem - 5vw)'
      : '0'};

  transition: width 1s ease-in-out;
`;

const Card = styled.div<{ $opened: string | null; $us: string }>`
  width: ${({ $opened, $us }) =>
    $opened === null
      ? 'calc((100vw - 2rem - 5vw) / 3)'
      : $opened === $us
      ? 'calc((100vw - 2rem - 5vw) / 3)'
      : '0'};

  opacity: ${({ $opened, $us }) =>
    $opened === null || $opened === $us ? 1 : 0};

  overflow: hidden;
  padding: 6rem 2vw;
  position: relative;
  transition: width 1s ease-in-out, opacity 0.15s ease-in-out;
`;

const CardInfo = styled.div<{ $isOpened: boolean }>`
  border: solid 0.2rem var(--frame-color);
  border-radius: 2rem;
  width: ${({ $isOpened }) => ($isOpened ? '66.66%' : '0')};
  opacity: ${({ $isOpened }) => ($isOpened ? 1 : 0)};
  overflow: hidden;

  transition: width 1s ease-in-out, border 0.15s ease-in-out,
    opacity
      ${({ $isOpened }) =>
        $isOpened ? '1s ease-in-out 0.45s' : '0.5s ease-in-out 0s'};
`;

const CardText = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 2rem;
  border: 0.2rem solid var(--frame-color);
  will-change: transform;

  transition: var(--transition);
  overflow: hidden;
  gap: 0.5rem;
  position: relative;
`;

const Svg = styled.svg`
  position: absolute;
  height: 3rem;
  width: 3rem;
  transition: var(--transition);
  transform: translateY(-50%);
  top: 10%;

  & > * {
    transition: var(--transition);
  }
`;

const CardSvgContainer = styled.div`
  width: 100%;
  background-color: var(--frame-color);
  display: flex;
  height: 20%;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
`;

const P = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Eurostyle';
  font-size: 1rem;
  transition: var(--transition);
  color: var(--main-color);
  user-select: none;
  flex: 1;
  padding-bottom: 0.4rem;
`;

type CardType = 'web' | 'mobile' | 'backend';

const skills = {
  web: [
    { name: 'HTML', color: '#e34c2622' },
    { name: 'CSS', color: '#264de422' },
    { name: 'JS', color: '#f0db4f22' },
    { name: 'TS', color: '#3178c622' },
    { name: 'React', color: '#61dafb22' },
    { name: 'SASS', color: '#cd679922' },
    { name: 'Bootstrap', color: '#7952b322' },
  ],
  mobile: [
    { name: 'HTML', color: '#e34c2622' },
    { name: 'CSS', color: '#264de422' },
    { name: 'JS', color: '#f0db4f22' },
    { name: 'TS', color: '#3178c622' },
    { name: 'React', color: '#61dafb22' },
    { name: 'SASS', color: '#cd679922' },
    { name: 'Bootstrap', color: '#7952b322' },
  ],
  backend: [
    { name: 'HTML', color: '#e34c2622' },
    { name: 'CSS', color: '#264de422' },
    { name: 'JS', color: '#f0db4f22' },
    { name: 'TS', color: '#3178c622' },
    { name: 'React', color: '#61dafb22' },
    { name: 'SASS', color: '#cd679922' },
    { name: 'Bootstrap', color: '#7952b322' },
  ],
};

const projects = {
  mobile: [
    { name: 'Per6', url: 'per6' },
    { name: 'Flora and Fauna', url: 'florafauna' },
    { name: 'Profix', url: 'profix' },
  ],
  backend: [
    { name: 'Per6', url: 'per6' },
    { name: 'Flora and Fauna', url: 'florafauna' },
    { name: 'Profix', url: 'profix' },
  ],
  web: [
    { name: 'Per6', url: 'per6' },
    { name: 'Flora and Fauna', url: 'florafauna' },
    { name: 'Profix', url: 'profix' },
  ],
};

function Projects() {
  const [openedCard, setOpenedCard] = useState<CardType | null>(null);

  const webRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const backendRef = useRef<HTMLDivElement>(null);

  const cardRefs = {
    web: webRef,
    mobile: mobileRef,
    backend: backendRef,
  };

  const icons = {
    backend: (
      <>
        <path
          d='m15.2189 14.9283.5303.5304zm.7809-4.7777-.75-.0032v.0032zm-.6663-.27738.5302.53048zm-1.8568 1.85598-.5302-.5305zm-1.7064-.0001.5302-.5304zm-3.19846-3.44815.53029.53037zm4.77846-.78077v.75001l.0032-.00001zm.2774.6662.5304.53031v-.00001zm-1.8562 1.85642-.5304-.53033v.00001zm-9.20468 8.1735.53033.5304h.00001zm2.73684 2.7369.53033.5303h.00004zm2.48617-8.7885-.74999-.0019zm-.58594 1.4143.53035.5303zm.50828-.6153-.69255-.2878zm3.64223 2.7665.0019.75zm-1.41446.586-.53037-.5302zm.61526-.5084-.2879-.6925zm.8011.6724c.9356-.0024 1.7817-.0182 2.4914-.1351.7158-.1179 1.3875-.3525 1.9015-.8664l-1.0606-1.0608c-.1998.1998-.518.3538-1.0848.4472-.5729.0943-1.3021.1127-2.2513.1151zm4.3929-1.0015c.2215-.2215.4313-.4563.5937-.7546.1656-.3039.2584-.6292.3138-1.01.1037-.7117.0931-1.7809.0931-3.5435h-1.5c0 1.842.0059 2.7548-.0774 3.3274-.0381.2613-.0896.4037-.1468.5086-.0602.1107-.1515.2259-.337.4113zm1.0006-5.3049c.0044-1.01948-1.2276-1.52967-1.9465-.81103l1.0604 1.06093c-.2262.226-.6153.0665-.6139-.2563zm-1.9465-.81103-1.8568 1.85593 1.0605 1.0609 1.8567-1.8559zm-1.8568 1.85593c-.1784.1783-.4676.1783-.646 0l-1.0605 1.0607c.764.764 2.0028.7641 2.767.0002zm-4.40667.9479c.00242-.9486.02074-1.6777.11515-2.25058.0934-.56679.24736-.88495.44715-1.0847l-1.06058-1.06075c-.51402.51394-.74866 1.18581-.86661 1.90155-.11694.70968-.13272 1.55568-.1351 2.49068zm.5623-3.33528c.18544-.18541.30067-.27669.41137-.33697.10497-.05716.24745-.1087.5088-.14674.5727-.08336 1.4857-.07743 3.328-.07743v-1.5c-1.7629 0-2.8322-.01054-3.544.09307-.38085.05543-.70615.14822-1.01012.31374-.29826.1624-.53315.37214-.75463.59358zm4.25137-.56114c-.3222.00138-.4827-.38754-.2561-.6141l1.0607 1.0606c.7192-.71926.2081-1.95085-.811-1.94649zm-.2561-.61411-1.8563 1.8564 1.0607 1.06063 1.8563-1.85641zm-1.8563 1.85641c-.7629.76302-.7664 2.00182-.0011 2.76692l1.0605-1.0607c-.1772-.1772-.178-.4662.0013-.6456zm-8.14395 10.91042c-.46287-.4629-.46287-1.2134 0-1.6762l-1.06066-1.0607c-1.048653 1.0487-1.048653 2.7489 0 3.7975zm1.67618 0c-.46287.4628-1.21332.4628-1.67618 0l-1.06066 1.0606c1.04865 1.0487 2.74885 1.0487 3.7975 0zm4.63624-4.6369-4.63628 4.6369 1.06074 1.0606 4.63627-4.637zm-6.31241 2.9607 4.63708-4.6374-1.06069-1.0606-4.63708 4.6373zm3.94268-6.5839c-.00056.2162-.00135.3376-.00843.4286-.00317.0406-.00683.0628-.00923.0743-.00113.0054-.00196.0082-.00226.0092-.00016.0006-.00026.0008-.00028.0009-.00001 0-.00001 0-.00002.0001l1.3851.5757c.14651-.3524.13422-.7361.13511-1.085zm.6944 1.9465c.24499-.245.52404-.5054.67048-.8577l-1.3851-.5757c-.00002 0-.00012.0003-.00059.0011-.00051.001-.00194.0036-.00492.0081-.00629.0096-.01926.0276-.04546.0581-.05881.0685-.1433.1537-.2951.3055zm3.61826.8709c-.3489.0009-.7327-.0114-1.0852.1351l.5759 1.3851c.0001-.0001.0003-.0002.0009-.0003.001-.0003.0038-.0011.0092-.0023.0115-.0024.0337-.006.0744-.0092.091-.0071.2123-.0079.4286-.0084zm-.8822 1.8663c.1518-.1518.237-.2363.3055-.2951.0305-.0262.0485-.0392.0581-.0455.0045-.003.0071-.0044.0081-.0049.0009-.0005.0011-.0006.0012-.0006l-.5759-1.3851c-.3523.1465-.61272.4256-.85773.6707z'
          fill='var(--accent-color)'
        />
        <path
          d='m8.73047 21.4999c1.29213-2.2009 4.25143-2.4604 5.93683-.7786.3768.376.5652.5641.7323.5866s.3532-.0832.7254-.2945l1.7247-.9793c.3794-.2153.569-.323.6351-.4793s-.0031-.4227-.1415-.9556c-.5034-1.9376.7173-3.9767 2.6677-4.5027.5219-.1407.7828-.2111.8859-.3457.1031-.1345.1031-.351.1031-.7839v-1.9337c0-.4329 0-.6494-.1031-.784-.1031-.1345-.364-.2049-.8859-.3456-1.9507-.52597-3.1724-2.5651-2.6692-4.5028.1383-.53293.2075-.7994.1414-.95565-.0661-.15624-.2557-.26392-.635-.47928l-1.7247-.97924c-.3723-.21134-.5584-.31701-.7254-.29451-.1671.02251-.3555.21051-.7324.58652-1.4593 1.45578-3.8737 1.45584-5.33294.00009-.37691-.376-.56537-.56401-.73241-.58651-.16705-.0225-.35317.08317-.7254.29451l-1.7247.97923c-.37933.21538-.56899.32306-.63509.47933-.06609.15627.00313.4227.14156.95558.50336 1.93764-.71732 3.97672-2.6677 4.50271-.52191.14072-.78287.21112-.88594.34572-.10308.1345-.10308.351-.10308.7839v1.9337c0 .4329 0 .6494.10308.784.10309.1346.36392.2049.88558.3455.00612.0017.01223.0034.01834.005'
          stroke='var(--accent-color)'
          stroke-linecap='round'
          stroke-width='1.5'
        />
      </>
    ),
    mobile: (
      <>
        <g stroke='var(--accent-color)' stroke-width='1.5'>
          <path
            d='m5 9c0-3.29983 0-4.94975 1.02513-5.97487 1.02512-1.02513 2.67504-1.02513 5.97487-1.02513 3.2998 0 4.9497 0 5.9749 1.02513 1.0251 1.02512 1.0251 2.67504 1.0251 5.97487v6c0 3.2998 0 4.9497-1.0251 5.9749-1.0252 1.0251-2.6751 1.0251-5.9749 1.0251-3.29983 0-4.94975 0-5.97487-1.0251-1.02513-1.0252-1.02513-2.6751-1.02513-5.9749z'
            stroke-linecap='round'
          />
          <g stroke-linejoin='round'>
            <path d='m11 19h2' stroke-linecap='round' />
            <path d='m9 2 .089.53402c.19288 1.15727.28932 1.73591.68619 2.08802.41401.3673 1.00091.37796 2.22481.37796s1.8108-.01066 2.2248-.37796c.3969-.35211.4933-.93075.6862-2.08802l.089-.53402' />
          </g>
        </g>
      </>
    ),
    web: (
      <>
        <g stroke='var(--accent-color)' stroke-width='1.5'>
          <circle cx='12' cy='12' r='10' />
          <ellipse cx='12' cy='12' rx='4' ry='10' />
          <path d='m2 12h20' stroke-linecap='round' stroke-linejoin='round' />
        </g>
      </>
    ),
  };

  useEffect(() => {
    const cleanups: (() => void)[] = [];

    Object.values(cardRefs).forEach((ref) => {
      const el = ref.current;
      if (!el) return;

      let req = 0;
      let targetX = 0,
        targetY = 0;
      let curX = 0,
        curY = 0;

      const handleMove = (e: MouseEvent) => {
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 30;
        const y = ((e.clientY - top) / height - 0.5) * 30;

        targetX = -y;
        targetY = x;

        if (!req) req = requestAnimationFrame(apply);
      };

      const apply = () => {
        req = 0;
        const lerp = 0.15;
        curX += (targetX - curX) * lerp;
        curY += (targetY - curY) * lerp;

        el.style.transform = `perspective(1000px) rotateX(${curX}deg) rotateY(${curY}deg)`;

        if (Math.abs(curX - targetX) > 0.1 || Math.abs(curY - targetY) > 0.1) {
          req = requestAnimationFrame(apply);
        }
      };

      const reset = () => {
        curX = curY = targetX = targetY = 0;
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      };

      el.addEventListener('mousemove', handleMove);
      el.addEventListener('mouseleave', reset);

      cleanups.push(() => {
        el.removeEventListener('mousemove', handleMove);
        el.removeEventListener('mouseleave', reset);
        if (req) cancelAnimationFrame(req);
      });
    });

    return () => cleanups.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards: CardType[] = ['web', 'mobile', 'backend'];

  return (
    <StyledSection>
      {cards.map((type) => (
        <CardContainer $opened={openedCard} $us={type} key={type}>
          <Card $opened={openedCard} $us={type}>
            <CardText
              ref={cardRefs[type]}
              onClick={() => setOpenedCard(openedCard === type ? null : type)}
            >
              <CardSvgContainer>
                <Svg
                  fill='none'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  {icons[type]}
                </Svg>
              </CardSvgContainer>
              <P>{type}</P>
            </CardText>
          </Card>
          <CardInfo $isOpened={openedCard === type}>
            <InfoContainer type={type} skills={skills[type]} projects={projects[type]} />
          </CardInfo>
        </CardContainer>
      ))}
    </StyledSection>
  );
}

export default Projects;
