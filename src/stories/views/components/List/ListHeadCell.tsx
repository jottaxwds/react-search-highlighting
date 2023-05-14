import React from "react";

import * as S from "./styles";
import { ColSize, ListHeadCellProps, SortType } from "./types";

const SortIndicator = ({
  isSorting,
  sortType,
}: {
  isSorting: boolean;
  sortType: "ASC" | "DESC";
}) => {
  const sortingSymbols = {
    NONE: "⇅",
    ASC: "↑",
    DESC: "↓",
  };

  const sortSymbol = isSorting
    ? sortingSymbols[sortType]
    : sortingSymbols["NONE"];
  return (
    <S.SortIndicator data-testid={"sort-indicator"} isSorting={isSorting}>
      {sortSymbol}
    </S.SortIndicator>
  );
};

const ListHeadCell = ({
  colName,
  colLabel,
  colSize = ColSize.MEDIUM,
  isSortable,
  isSorting,
  sortType = SortType.ASC,
  textAlign,
  onColSort,
}: ListHeadCellProps) =>
  React.useMemo(
    () => (
      <S.HeadCell
        data-testid={"list-head-cell"}
        colSize={colSize}
        textAlign={textAlign}
        isSortable={isSortable}
        onClick={() =>
          isSortable &&
          onColSort({
            colName,
            sortType:
              sortType === SortType.ASC ? SortType.DESC : SortType.ASC,
          })
        }
      >
        <span>{colLabel}</span>
        {isSortable ? (
          <SortIndicator isSorting={isSorting} sortType={sortType} />
        ) : (
          <></>
        )}
      </S.HeadCell>
    ),
    [
      colLabel,
      colName,
      colSize,
      isSortable,
      isSorting,
      onColSort,
      sortType,
      textAlign,
    ]
  );

export default ListHeadCell;
