import React from 'react';

import { getHighlightedStringContent } from './utils';
import { NonExactHighlightProps } from './types';
import { defaultTheme } from './constants';
import Highlight from './Highlight';

function NonExactHighlighting({ termsToHighlight, children, caseSensitive, ignoreDiacritics, theme = defaultTheme }: NonExactHighlightProps) {
    const config = {
        exactMatch: false,
        caseSensitive,
        ignoreDiacritics,
    };
    const highlightedContent = getHighlightedStringContent({ termsToHighlight, content: children, config});
    return React.useMemo(
        () => (
            <>
                {highlightedContent.map(({ content, highlighted }) =>(<Highlight content={content} highlighted={highlighted} theme={theme} />))}
            </>
        ),
        [highlightedContent]
    );
}

export default NonExactHighlighting;
