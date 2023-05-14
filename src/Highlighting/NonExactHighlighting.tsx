import uniqueId from 'lodash/uniqueId';
import React from 'react';

import { getHighlightedStringContent } from './utils';
import { NonExactHighlightProps } from './types';
import { defaultTheme } from './constants';

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
                {highlightedContent.map(({ content, highlighted }) =>
                    highlighted ? (
                        <mark key={uniqueId('highlighted')} style={{ ...theme }} data-testid="highlighted">{content}</mark>
                    ) : (
                        <span key={uniqueId('not-highlighted')}>{content}</span>
                    )
                )}
            </>
        ),
        [highlightedContent]
    );
}

export default NonExactHighlighting;
