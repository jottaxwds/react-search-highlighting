import React from "react";
import { DEFAULT_PAGE_SIZE } from "../../../constants";
import { KeyValueObject, SortType } from "../types";
import { chunkData } from "../utils";

type UsePaginationProps<T> = {
  items: KeyValueObject<T>[];
  sortBy: string;
  sortType: SortType;
  pageSize?: number;
};

function usePagination<T>({
  items,
  sortBy,
  sortType,
  pageSize = DEFAULT_PAGE_SIZE,
}: UsePaginationProps<T>) {
  const [pageCount, setPageCount] = React.useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pages = React.useMemo(
    () => (items.length < pageSize ? [[...items]] : chunkData(items, pageSize)),
    // This dependency array made in this way intentionally, just avoiding warnings with next line...
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, sortBy, sortType]
  );

  const handlePagination = React.useCallback(
    (nextPage: number) => {
      if (nextPage >= 0 && nextPage < pages.length) {
        setPageCount(nextPage);
      }
    },
    [pages.length]
  );

  return { handlePagination, pageCount, pages };
}

export default usePagination;
