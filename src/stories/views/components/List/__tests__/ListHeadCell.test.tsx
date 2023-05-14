import "@testing-library/jest-dom";
import React from 'react';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ListHeadCell from "../ListHeadCell";
import { Alignment, SortType } from "../types";

describe("ListHeadCell", () => {
  const colConfig = {
    colName: "name",
    colLabel: "Name",
    isSortable: false,
    isSorting: false,
    sortType: SortType.ASC,
    textAlign: Alignment.RIGHT,
    onColSort: () => {},
  };

  it("Should show NOT sort indicator if given `isSortable` is set to `false`", () => {
    render(
      <table>
        <thead>
          <tr>
            <ListHeadCell {...colConfig} />
          </tr>
        </thead>
      </table>
    );
    expect(screen.queryByTestId("sort-indicator")).not.toBeInTheDocument();
  });

  it("Should show sort indicator if given `isSortable` is set to `true`", () => {
    render(
      <table>
        <thead>
          <tr>
            <ListHeadCell {...colConfig} isSortable />
          </tr>
        </thead>
      </table>
    );
    const sortIndicator = screen.getByTestId("sort-indicator");
    expect(sortIndicator).toBeInTheDocument();
    expect(sortIndicator.textContent).toEqual("⇅");
  });

  it("Should show right sorting indicator if sortType is ASC", () => {
    render(
      <table>
        <thead>
          <tr>
            <ListHeadCell {...colConfig} isSortable isSorting />
          </tr>
        </thead>
      </table>
    );
    const sortIndicator = screen.getByTestId("sort-indicator");
    expect(sortIndicator).toBeInTheDocument();
    expect(sortIndicator.textContent).toEqual("↑");
  });

  it("Should show right sorting indicator if sortType is DESC", () => {
    render(
      <table>
        <thead>
          <tr>
            <ListHeadCell {...colConfig} isSortable isSorting sortType={SortType.DESC} />
          </tr>
        </thead>
      </table>
    );
    const sortIndicator = screen.getByTestId("sort-indicator");
    expect(sortIndicator).toBeInTheDocument();
    expect(sortIndicator.textContent).toEqual("↓");
  });

  it("Should NOT call onColSort when given `isSortable` is set to `false` and is clicked", () => {
    const colSortHandler = jest.fn();
    render(
      <table>
        <thead>
          <tr>
            <ListHeadCell {...colConfig} onColSort={colSortHandler} />
          </tr>
        </thead>
      </table>
    );
    const headCell = screen.getByTestId("list-head-cell");
    userEvent.click(headCell);
    expect(colSortHandler).not.toHaveBeenCalled();
  });

  it("Should call onColSort when given `isSortable` is set to `true` and is clicked", async () => {
    const colSortHandler = jest.fn();
    render(
      <table>
        <thead>
          <tr>
            <ListHeadCell
              {...colConfig}
              isSortable
              sortType={SortType.ASC}
              onColSort={colSortHandler}
            />
          </tr>
        </thead>
      </table>
    );
    const headCell = screen.getByTestId("list-head-cell");
    await userEvent.click(headCell);
    expect(colSortHandler).toHaveBeenCalledTimes(1);
    expect(colSortHandler).toHaveBeenCalledWith({
      colName: "name",
      sortType: SortType.DESC,
    });
  });
});
