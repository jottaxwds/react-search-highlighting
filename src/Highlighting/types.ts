export type HighlightingConfig = {
    caseSensitive: boolean;
    exactMatch: boolean;
    /**
     * To highlight considering diacritics
     */
    ignoreDiacritics: boolean;
};

export type HighlightingTheme = {
    color?: string;
    background?: string;
    fontWeight?: string;
}

export type PartialHighlightingConfig = Omit<HighlightingConfig, 'exactMatch'>;

export type State = {
    termsToHighlight: string;
    config: HighlightingConfig;
    updateTermsToHighlight: (termsToHighlight: string) => void;
    updateConfig: (config: HighlightingConfig) => void;
};

export interface HighlightingProviderProps {
    children: any;
    config?: HighlightingConfig;
}

export interface GetHighlightedStringContentArgs {
    termsToHighlight: string;
    content: string;
    config: HighlightingConfig
}
export interface GetContentPartsToHighlightArgs {
    termParts: string[];
    content: string;
    config: PartialHighlightingConfig;
}

export interface ExactHighlightingProps {
    caseSensitive: boolean;
    ignoreDiacritics: boolean;
    children: string;
    termsToHighlight: string;
    theme?: HighlightingTheme;
}

export interface NonExactHighlightProps {
    children: string;
    termsToHighlight: string;
    caseSensitive: boolean;
    ignoreDiacritics: boolean;
    theme?: HighlightingTheme;
}

export interface HighlightedContent {
  content: string
  highlighted: boolean
}