import spacing from "./spacing";

const fontFamily = {
  default: "Open Sans, sans-serif",
} as const;

const fontWeight = {
  light: 300,
  regular: 400,
  semiBold: 600,
  bold: 700,
} as const;

const fontSize = {
  xxSmall: "0.8rem",
  xSmall: "1rem",
  small: "1.2rem",
  normal: "1.4rem",
  large: "1.6rem",
  xLarge: "1.8rem",
  xxLarge: "2.6rem",
} as const;

const typography = {
  fontFamily,
  fontWeight,
  fontSize,
} as const;

const elements = {
  mainTitle: Object.defineProperty(
    {
      fontFamily: typography.fontFamily.default,
      fontSize: typography.fontSize.xxLarge,
      fontWeight: typography.fontWeight.bold,
      marginBottom: spacing.mediumLarge,
    } as const,
    "name",
    {
      enumerable: false,
      value: "Page Heading",
    }
  ),
  mainSubtitle: Object.defineProperty(
    {
      fontFamily: typography.fontFamily.default,
      fontSize: typography.fontSize.large,
      fontWeight: typography.fontWeight.regular,
    } as const,
    "name",
    {
      enumerable: false,
      value: "Main Subtitle",
    }
  ),
  tableText: Object.defineProperty(
    {
      fontFamily: typography.fontFamily.default,
      fontSize: typography.fontSize.xSmall,
      fontWeight: typography.fontWeight.regular,
    } as const,
    "name",
    {
      enumerable: false,
      value: "Table Text",
    }
  ),
  text: Object.defineProperty(
    {
      fontFamily: typography.fontFamily.default,
      fontSize: typography.fontSize.xSmall,
      fontWeight: typography.fontWeight.regular,
    } as const,
    "name",
    {
      enumerable: false,
      value: "Body Text",
    }
  ),
  cta: Object.defineProperty(
    {
      fontFamily: typography.fontFamily.default,
      fontSize: typography.fontSize.xSmall,
      fontWeight: typography.fontWeight.semiBold,
    } as const,
    "name",
    {
      enumerable: false,
      value: "Body Text",
    }
  ),
};

export default {
  ...typography,
  ...elements,
} as const;
