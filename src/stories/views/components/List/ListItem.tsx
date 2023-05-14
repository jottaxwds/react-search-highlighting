import { snakeCase } from "lodash";

import * as S from "./styles";
import { Alignment } from "./types";

type ListItemProps<T> = {
  cells: {
    colName: string;
    value: T;
    textAlign: Alignment;
    isSorting: boolean;
    conditionalColor: (args:any) => string;
  }[];
};

function ListItem<T> ({ cells }: ListItemProps<T>) {
  return (
    <tr data-testid={"list-item"}>
      {cells.map((cell, index) => {
        const { value, textAlign = "left", isSorting } = cell;
        return (
          <S.Cell
            data-testid={"list-item-cell"}
            key={`${snakeCase(`${value}-${index}`)}`}
            textAlign={textAlign as Alignment}
            isSorting={isSorting}
            color={cell?.conditionalColor(value)}
          >
            {value as string}
          </S.Cell>
        );
      })}
    </tr>
  );
}

export default ListItem;
