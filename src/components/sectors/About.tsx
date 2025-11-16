import styled from "styled-components";

const StyledWrapper = styled.div`
  height: calc(100dvh - 2rem);
  padding: 5rem 3rem 5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    height: auto;
    padding: 2rem 1rem;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.45rem;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  width: 100%;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--main-color);
  font-family: "Eurostyle";
`;

const StatKey = styled.div`
  font-size: 0.9rem;
  opacity: 0.7;
`;

const Description = styled.div`
  grid-column: span 3;
  grid-row: span 2;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  line-height: 1.75rem;
  padding: 1rem 4rem;
  backdrop-filter: blur(6px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-indent: 2rem;
`;

export default function About() {
  return (
    <StyledWrapper>
      <Stat>
        <StatValue>11</StatValue>
        <StatKey>Курсів</StatKey>
      </Stat>

      <Stat>
        <StatValue>7</StatValue>
        <StatKey>Проєктів</StatKey>
      </Stat>

      <Stat>
        <StatValue>2+</StatValue>
        <StatKey>Років розробки</StatKey>
      </Stat>

      <Description>
        <p>
          Я Олександр, 19-річний фронтенд-розробник та студент 3 курсу
          спеціальності «Кібербезпека» у Львівській політехніці. Обожнюю
          будувати зрозумілі, швидкі та акуратні інтерфейси, звертаючи увагу на
          деталі, анімації та загальний досвід користувача.
        </p> <br />
        <p>
          Маю досвід роботи в командних проєктах, де поєдную технічні навички з
          організацією процесів: планую задачі, стежу за дедлайнами та
          комунікацією. Люблю, коли код не просто «працює», а є читабельним,
          продуманим і готовим до масштабування.
        </p>
      </Description>

      <Stat>
        <StatValue>@zaiiats</StatValue>
        <StatKey>Instagram</StatKey>
      </Stat>

      <Stat>
        <StatValue>@zaiiats</StatValue>
        <StatKey>Telegram</StatKey>
      </Stat>

      <Stat>
        <StatValue style={{ fontSize: "1rem" }}>
          zaiatsoleksandry@gmail.com
        </StatValue>
        <StatKey>email</StatKey>
      </Stat>
    </StyledWrapper>
  );
}
