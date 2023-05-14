import React from 'react';

import NonExactHighlighting from './NonExactHighlighting';
import { HighlightingContext } from './HighlightingContext';
import { HighlightingConfig, HighlightingTheme } from './types';
import { defaultConfig, defaultTheme } from './constants';
import ExactHighlighting from './ExactHighlighting';

export interface HighlightingProps {
    children: string | JSX.Element;
    termsToHighlight?: string;
    config?: HighlightingConfig;
    prioritiseCtxConfig?: boolean;
    theme?: HighlightingTheme;
}

function Highlighting({ children, termsToHighlight = '', config = defaultConfig, prioritiseCtxConfig = false, theme = defaultTheme }: HighlightingProps) {
    const { termsToHighlight: contextTermsToHighlight, config: { ignoreDiacritics: ctxIgnoreDiacritics, exactMatch: ctxExactMatch, caseSensitive: ctxCaseSensitive} } = React.useContext(HighlightingContext);
    const { caseSensitive, exactMatch, ignoreDiacritics } = config;
    const mergedConfig = prioritiseCtxConfig ? {
        caseSensitive: ctxCaseSensitive ?? caseSensitive,
        exactMatch: ctxExactMatch ?? exactMatch,
        ignoreDiacritics: ctxIgnoreDiacritics ?? ignoreDiacritics,
    } : {...config};

    const newTermsToHighlight = termsToHighlight || contextTermsToHighlight;
    // TODO: v2.0.0
    if (newTermsToHighlight === '' || typeof children !== 'string') {
        return <>{ children }</>;
    }
    return mergedConfig.exactMatch ?
    <ExactHighlighting theme={theme} termsToHighlight={newTermsToHighlight} caseSensitive={config.caseSensitive} ignoreDiacritics={config.ignoreDiacritics}>{children}</ExactHighlighting>
      :
    <NonExactHighlighting theme={theme} termsToHighlight={newTermsToHighlight} caseSensitive={config.caseSensitive} ignoreDiacritics={config.ignoreDiacritics}>{children}</NonExactHighlighting>;
}
export default Highlighting;
