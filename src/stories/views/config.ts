import { ColSize } from "./components/List/types";

const config = [
  {
    colName: "name",
    colLabel: "Name",
    isSortable: true,
    colSize: ColSize.LARGE,
  },
  { colName: "email", colLabel: "Email", colSize: ColSize.XLARGE },
  { colName: "age", colLabel: "Age", colSize: ColSize.SMALL},
  {
    colName: "year_of_experience",
    colLabel: "Years of Experience",
    isSortable: true,
    colSize: ColSize.LARGE,
  },
  {
    colName: "position_applied",
    colLabel: "Position applied",
    colSize: ColSize.MEDIUMLARGE,
  },
  {
    colName: "application_date",
    colLabel: "Applied",
    isSortable: true,
    colSize: ColSize.MEDIUM,
  },
  { colName: "status", colLabel: "Status", colSize: ColSize.MEDIUM },
];
export { config };
