import { SortType } from "../types";
import { sortItems } from "../utils";
const data = [
  {"name": "Dalton Morin", "application_date": "06/18/2022"},
  {"name": "Dawn Huff", "application_date": "02/25/2022"},
  {"name": "Emery Marsh", "application_date": "05/04/2022"},
  {"name": "Erin Jarvis", "application_date": "04/05/2022"},
  {"name": "Hakeem Farley", "application_date": "06/17/2022"},
  {"name": "Hilda Harrell", "application_date": "06/03/2021"},
  {"name": "Honorato Myers", "application_date": "02/07/2021"},
  {"name": "Rebekah Noble", "application_date": "11/21/2021"},
  {"name": "Sean Nixon", "application_date": "06/11/2021"},
  {"name": "Todd Bradshaw", "application_date": "03/21/2021"}
];

describe("List utils", () => {
  const dataSet = data.slice(0, 10);
  it("Should sort items by field that is a valid string date in ASC order", () => {
    const sortedData = sortItems(dataSet, "application_date", SortType.ASC);
    const expectedSortedDates = [
      "06/18/2022",
      "06/17/2022",
      "05/04/2022",
      "04/05/2022",
      "02/25/2022",
      "11/21/2021",
      "06/11/2021",
      "06/03/2021",
      "03/21/2021",
      "02/07/2021",
    ];
    const sortedDates = sortedData.map(
      ({ application_date }) => application_date
    );
    console.log('SortedDates -> ', sortedDates);
    const rightSorted =
      JSON.stringify(expectedSortedDates) === JSON.stringify(sortedDates);
    expect(rightSorted).toBeTruthy();
  });

  it("Should sort items by field that is a valid string date in DESC order", () => {
    const sortedData = sortItems(dataSet, "application_date", SortType.DESC);
    const expectedSortedDates = [
      "02/07/2021",
      "03/21/2021",
      "06/03/2021",
      "06/11/2021",
      "11/21/2021",
      "02/25/2022",
      "04/05/2022",
      "05/04/2022",
      "06/17/2022",
      "06/18/2022",
    ];
    const sortedDates = sortedData.map(
      ({ application_date }) => application_date
    );
    const rightSorted =
      JSON.stringify(expectedSortedDates) === JSON.stringify(sortedDates);
    expect(rightSorted).toBeTruthy();
  });

  it("Should sort items by string field values in ASC order", () => {
    const sortedData = sortItems(dataSet, "name", SortType.ASC);
    const sortedFields = sortedData.map(({ name }) => name);
    const expectedSortedFields = [
      "Dalton Morin",
      "Dawn Huff",
      "Emery Marsh",
      "Erin Jarvis",
      "Hakeem Farley",
      "Hilda Harrell",
      "Honorato Myers",
      "Rebekah Noble",
      "Sean Nixon",
      "Todd Bradshaw",
    ];
    const rightSorted =
      JSON.stringify(sortedFields) === JSON.stringify(expectedSortedFields);
    expect(rightSorted).toBeTruthy();
  });

  it("Should sort items by string field values in DESC order", () => {
    const sortedData = sortItems(dataSet, "name",SortType.DESC);
    const sortedFields = sortedData.map(({ name }) => name);
    const expectedSortedFields = [
      "Todd Bradshaw",
      "Sean Nixon",
      "Rebekah Noble",
      "Honorato Myers",
      "Hilda Harrell",
      "Hakeem Farley",
      "Erin Jarvis",
      "Emery Marsh",
      "Dawn Huff",
      "Dalton Morin",
    ];
    const rightSorted =
      JSON.stringify(sortedFields) === JSON.stringify(expectedSortedFields);
    expect(rightSorted).toBeTruthy();
  });
});
