import styled, { css } from 'styled-components';

type ButtonStyleType = 'main' | 'secondary';

interface ButtonProps {
  text: string;
  style?: ButtonStyleType;
  onClick?: () => void;
}

const StyledButton = styled.button<{ $variant: ButtonStyleType }>`
  font-family: 'Eurostyle', sans-serif;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  align-self: start;

  ${({ $variant }) =>
    $variant === 'main'
      ? css`
          background-color: var(--accent-color);
          color: white;
          box-shadow: 0 0 13px var(--accent-color);

          &:hover {
            background-color: var(--accent-color-high);
            box-shadow: 0 0 17px var(--accent-color-high);
          }
        `
      : css``}
`;

function Button({ text, style = 'main', onClick }: ButtonProps) {
  return (
    <StyledButton $variant={style} onClick={onClick}>
      {text}
    </StyledButton>
  );
}

export default Button;
