import React from "react";
import * as S from "./styles";
import { CheckChangeEventArg } from "./types";

type CheckProps = {
  displayValue: string;
  value: string;
  id: string;
  name: string;
  isChecked?: boolean;
  onChange: ({ id, value, checked }: CheckChangeEventArg) => void;
};

function Check({
  displayValue,
  value,
  id,
  name,
  onChange,
  isChecked = false,
}: CheckProps) {
  const [checked, setChecked] = React.useState(isChecked);

  React.useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked },
    } = event;
    setChecked(checked);
    onChange({ id, value, checked });
  };

  return (
    <S.Wrapper>
      <input
        data-testid={"check-input"}
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        hidden
        onChange={handleOnChange}
      />
      <S.Label htmlFor={name}>{displayValue}</S.Label>
    </S.Wrapper>
  );
}

export default Check;
