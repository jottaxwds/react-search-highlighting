export enum Alignment {
  RIGHT = "right",
  LEFT = "left",
  CENTER = "center",
}

export enum ColSize {
  XSMALL = "xSmall",
  SMALL = "small",
  MEDIUM = "medium",
  MEDIUMLARGE = "mediumLarge",
  LARGE = "large",
  XLARGE = "xLarge",
  AUTO = "auto",
}

export enum SortType {
  ASC = "ASC",
  DESC = "DESC",
}

export type Col = {
  colName: string;
  colLabel: string;
  textAlign?: Alignment;
  isSortable?: boolean;
  colSize?: ColSize;
  conditionalColor?: (args?: any) => string;
};
export type OnColSortProps = { colName: string; sortType: SortType };
export type OnColSort = ({ colName, sortType }: OnColSortProps) => void;

export type KeyValueObject<T> = Record<string, T>;

export type ListProps<T> = {
  items: KeyValueObject<T>[];
  itemsPerPage?: number;
  columnsConfig: Col[];
  isLoading: boolean;
};

export type ListHeadCellProps = {
  colName: string;
  colLabel: string;
  colSize?: ColSize;
  isSortable: boolean;
  isSorting: boolean;
  sortType: SortType;
  textAlign: Alignment;
  onColSort: OnColSort;
};
