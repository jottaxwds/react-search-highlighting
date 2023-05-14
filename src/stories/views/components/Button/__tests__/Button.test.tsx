import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";

import Button from "../Button";

describe("Button", () => {
  it("Should call onClick when is clicked and not disabled", () => {
    const clickHandler = jest.fn();
    render(<Button label={"example"} onClick={clickHandler} />);
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it("Should NOT call onClick when is clicked and not disabled", () => {
    const clickHandler = jest.fn();
    render(<Button label={"example"} onClick={clickHandler} isDisabled />);
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);
    expect(clickHandler).not.toHaveBeenCalled();
  });
});
