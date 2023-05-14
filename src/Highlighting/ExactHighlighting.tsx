import React from "react";
import { getHighlightedStringContent } from "./utils";
import { uniqueId } from "lodash";
import { ExactHighlightingProps } from "./types";
import { defaultTheme } from "./constants";

function ExactHighlighting ({ termsToHighlight, children, caseSensitive, ignoreDiacritics, theme = defaultTheme }: ExactHighlightingProps) {
    const config = {
        exactMatch: true,
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

export default ExactHighlighting;