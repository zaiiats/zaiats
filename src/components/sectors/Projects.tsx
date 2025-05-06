import { useState } from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
  display: flex;
  height: 100%;
  padding: 1rem 0 4rem;
`;

const Card = styled.div<{ $isOpened: boolean }>`
  background-color: green;
  width: ${({ $isOpened }) => ($isOpened ? '33.33%' : '0')};
  opacity: ${({ $isOpened }) => ($isOpened ? 1 : 0)};
  overflow: hidden;
  transition: all 0.5s ease;
`;

const CardInfo = styled.div<{ $isOpened: boolean }>`
  background-color: orangered;
  width: ${({ $isOpened }) => ($isOpened ? '66.66%' : '0')};
  opacity: ${({ $isOpened }) => ($isOpened ? 1 : 0)};
  overflow: hidden;
  transition: all 0.5s ease;
`;

type CardType = 'web' | 'mobile' | 'backend';

function Projects() {
  const [openedCard, setOpenedCard] = useState<CardType | null>(null);

  const cards: CardType[] = ['web', 'mobile', 'backend'];

  return (
    <StyledSection>
      {cards.map((type) => (
        <>
          <Card
            key={type}
            $isOpened={openedCard === null || openedCard === type}
          >
            <button
              onClick={() => setOpenedCard(openedCard === type ? null : type)}
            >
              {type}
            </button>
          </Card>
          <CardInfo key={`${type}-info`} $isOpened={openedCard === type}>
            {type.toUpperCase()}
          </CardInfo>
        </>
      ))}
    </StyledSection>
  );
}

export default Projects;
