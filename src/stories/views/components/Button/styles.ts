import styled from "styled-components";
import theme from "../../../theme";

export const Button = styled.button<{
  disabled: boolean;
}>`
  background: ${({ disabled }) =>
    disabled ? theme.palette.light : theme.palette.blue};
  color: ${({ disabled }) =>
    disabled ? theme.palette.subdued : theme.palette.light};
  padding: ${theme.spacing.xSmall};
  border-radius: 3px;
  border: none;
  cursor: pointer;
  &:hover {
    ${({ disabled }) =>
      disabled
        ? `
            background: ${theme.palette.light}; color: ${theme.palette.subdued};
        `
        : `background: ${theme.palette.green}; color: ${theme.palette.darkGreen};`}
  }
  &:active {
    ${({ disabled }) =>
      disabled
        ? `background: ${theme.palette.light}; color: ${theme.palette.subdued};`
        : `background: ${theme.palette.darkGreen}; color: ${theme.palette.green};`}
  }
`;
