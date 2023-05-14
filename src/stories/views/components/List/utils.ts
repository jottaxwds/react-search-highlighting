import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT, DEFAULT_SORT_TYPE } from "../../constants";
import { KeyValueObject, SortType } from "./types";

const isValidDateValue = (field: string) =>
  dayjs(field, DEFAULT_DATE_FORMAT).isValid();
export const sortItems = <T>(
  items: KeyValueObject<T>[],
  sortBy: string,
  sortType: SortType
) =>
  Object.entries(items).map(([, item]) => (item)).sort((itemA, itemB) => {
    const valueFromA = itemA[sortBy as keyof typeof itemA];
    const valueFromB = itemB[sortBy as keyof typeof itemB];
    const isDateType =
      typeof valueFromA === "string" &&
      typeof valueFromB === "string" &&
      isValidDateValue(valueFromA as string) &&
      isValidDateValue(valueFromB as string);
    if (isDateType) {
      const diff = dayjs(valueFromA, DEFAULT_DATE_FORMAT).diff(
        dayjs(valueFromB, DEFAULT_DATE_FORMAT)
      );
      if (diff > 0) {
        return sortType === DEFAULT_SORT_TYPE ? -1 : 1;
      }
      if (diff < 0) {
        return sortType === DEFAULT_SORT_TYPE ? 1 : -1;
      }
      return 0;
    }
    if (
      itemA[sortBy as keyof typeof itemA] < itemB[sortBy as keyof typeof itemB]
    ) {
      return sortType === DEFAULT_SORT_TYPE ? -1 : 1;
    }
    if (
      itemA[sortBy as keyof typeof itemA] > itemB[sortBy as keyof typeof itemB]
    ) {
      return sortType === DEFAULT_SORT_TYPE ? 1 : -1;
    }
    return 0;
  });

export function chunkData<T>(arr: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  let i = 0;
  while (i < arr.length) {
    chunks.push(arr.slice(i, i + chunkSize));
    i += chunkSize;
  }
  return chunks;
}
