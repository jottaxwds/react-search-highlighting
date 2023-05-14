import * as S from "./styles";

const LoadingItem = ({ colSpan = 0 }) => (
  <S.Loading data-testid={"loading-item"}>
    <td colSpan={colSpan}>Loading...</td>
  </S.Loading>
);

export default LoadingItem;
