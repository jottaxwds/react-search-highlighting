import styled from "styled-components";

import theme from "../../../theme";
import { Alignment, ColSize } from "./types";

export const Cell = styled.td<{ textAlign: Alignment; isSorting: boolean; color?: string; }>`
  text-align: ${({ textAlign }) => textAlign ?? Alignment.RIGHT};
  color: ${({ color }) => color};
  &&& { ${({ isSorting }) => isSorting && `background: ${theme.palette.blue};`} }
`;

export const NoItems = styled.tr`
  &&&,td,td: hover {
    cursor: default;
    background: ${theme.palette.white};
    padding: ${theme.spacing.xxLarge};
    ${theme.typography.text};
    color: ${theme.palette.light};
    text-align: center;
  }
`;

export const ListWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
`;

export const List = styled.table`
  color: ${theme.palette.light};
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  border-radius: 8px;
`;

export const Loading = styled.tr`
  &&& td,
  td:hover {
    cursor: default;
    background: ${theme.palette.light};
    ${theme.typography.text};
    text-align: center;
    padding: ${theme.spacing.xxLarge};
    color: ${theme.palette.green};
  }
`;

export const Heading = styled.thead`
  ${theme.typography.tableText};
  background: ${theme.palette.midBlue};
  color: ${theme.palette.subdued};
  border-bottom: 2px solid ${theme.palette.subdued}
`;

export const Body = styled.tbody`
  background: ${theme.palette.midBlue};
  cursor: pointer;
  ${theme.typography.text};
  &&& tr:hover {
    background: ${theme.palette.blue};
  }
  && td {
    padding: ${theme.spacing.smallMedium} ${theme.spacing.small};
  }
  && tr:not(:last-child) {
    border-bottom: 2px solid ${theme.palette.darkBlue}
  }
`;

export const Pagination = styled.div`
  margin: auto;
  margin-top: ${theme.spacing.mediumLarge};
  width: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &&& button:not(:disabled) {
    background: ${theme.palette.blue};
    &:hover {
      background: ${theme.palette.paleBlue};
    }
  }
`;

export const Count = styled.span`
  padding: 0 ${theme.spacing.xSmall};
  color: ${theme.palette.light};
  ${theme.typography.text};
`;

export const HeadCell = styled.th<{
  colSize: ColSize;
  isSortable: boolean;
  textAlign: Alignment;
}>`
  ${({ isSortable }) => isSortable && "padding-right: 15px;"}
  cursor: ${({ isSortable }) => (isSortable ? "pointer" : "default")};
  padding: ${theme.spacing.xSmall};
  padding-left: ${theme.spacing.small};
  text-align: ${({ textAlign }) => textAlign};
  &&& {
    width: ${({ colSize }) =>
      theme.tableSpacing[colSize as keyof typeof theme.tableSpacing]};
  }
`;

export const SortIndicator = styled.span<{ isSorting: boolean }>`
  height: 100%;
  width: 15px;
  && {
    ${({ isSorting }) => isSorting && `color: ${theme.palette.green}`}
  }
  font-weight: ${theme.typography.fontWeight.bold};
  margin-left: ${theme.spacing.small};
`;
