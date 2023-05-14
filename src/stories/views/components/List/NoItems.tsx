import * as S from "./styles";

const NoItems = ({ colSpan = 0 }) => (
  <S.NoItems data-testid={"no-items"}>
    <td colSpan={colSpan}>...No items found...</td>
  </S.NoItems>
);

export default NoItems;
