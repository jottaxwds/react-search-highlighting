import React from 'react';
import * as S from "./styles";

type ButtonProps = {
  label: string;
  isDisabled?: boolean;
  onClick: () => void;
};

const Button = ({ label, isDisabled = false, onClick }: ButtonProps) => (
  <S.Button role="button" disabled={isDisabled} onClick={onClick}>
    {" "}
    {label}{" "}
  </S.Button>
);

export default Button;
