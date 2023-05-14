import React from "react";

import { snakeCase } from "lodash";
import { DEFAULT_PAGE_SIZE } from "../../constants";
import Button from "../Button/Button";
import usePagination from "./hooks/usePagination";
import ListHeadCell from "./ListHeadCell";
import ListItem from "./ListItem";
import LoadingItem from "./LoadingItem";
import NoItems from "./NoItems";
import * as S from "./styles";
import {
  Alignment,
  ColSize,
  KeyValueObject,
  ListProps,
  OnColSortProps,
  SortType,
} from "./types";
import { sortItems } from "./utils";
import theme from "../../../theme";
import Highlighting from "../../../../Highlighting/Highlighting";

function List<T>({
  items,
  itemsPerPage = DEFAULT_PAGE_SIZE,
  columnsConfig,
  isLoading = false,
}: ListProps<T>) {
  const [sort, setSorting] = React.useState({
    sortBy: "",
    sortType: SortType.ASC,
  });
  const sortedItems = React.useMemo(
    () =>
      items.length && sort.sortBy !== undefined
        ? sortItems(items, sort.sortBy, sort.sortType)
        : items,
    [items, sort.sortBy, sort.sortType]
  );

  const { handlePagination, pageCount, pages } = usePagination({
    items: sortedItems as KeyValueObject<T>[],
    sortBy: sort.sortBy ?? "",
    sortType: sort.sortType,
    pageSize: itemsPerPage,
  });

  const handleOnColSort = ({ colName, sortType }: OnColSortProps) => {
    setSorting({ sortBy: colName, sortType });
  };

  return (
    <>
      <S.ListWrapper>
        <S.List>
          <S.Heading>
            <tr>
              {columnsConfig.map(
                ({
                  colName,
                  colLabel,
                  isSortable = false,
                  textAlign = Alignment.LEFT,
                  colSize = ColSize.MEDIUM,
                }) => (
                  <ListHeadCell
                    key={`${colName}-${snakeCase(colLabel)}`}
                    colName={colName}
                    colLabel={colLabel}
                    colSize={colSize}
                    isSortable={isSortable ?? false}
                    isSorting={isSortable && sort.sortBy === colName}
                    sortType={sort.sortType}
                    textAlign={textAlign}
                    onColSort={handleOnColSort}
                  />
                )
              )}
            </tr>
          </S.Heading>
          {isLoading ? (
            <S.Body>
              <LoadingItem colSpan={columnsConfig.length} />
            </S.Body>
          ) : (
            <S.Body>
              {pages[0].length ? (
                pages?.[pageCount].map((item, position) => {
                  const cells = columnsConfig.map(
                    ({ colName, textAlign = Alignment.LEFT, conditionalColor = () => theme.palette.light, }) => ({
                      colName,
                      value: item[colName],
                      textAlign,
                      isSorting: sort.sortBy === colName,
                      conditionalColor,
                    })
                  );
                  return <ListItem key={`item-${position}-${item["id"]}`} cells={cells} />;
                })
              ) : (
                <NoItems colSpan={columnsConfig.length} />
              )}
            </S.Body>
          )}
        </S.List>
      </S.ListWrapper>
      {pages[0].length ? (
        <S.Pagination data-testid={"pagination"}>
          <Button
            label="PREV"
            isDisabled={pageCount === 0}
            onClick={() => handlePagination(pageCount - 1)}
          />
          <S.Count data-testid={"pagination-info"}>{`Page ${pageCount + 1} of ${
            pages.length
          }`}</S.Count>
          <Button
            label="NEXT"
            isDisabled={!pages.length || pageCount === pages.length - 1}
            onClick={() => handlePagination(pageCount + 1)}
          />
        </S.Pagination>
      ) : (
        <></>
      )}
    </>
  );
}

export default List;
