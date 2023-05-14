import React from "react";
import { getHighlightedStringContent } from "./utils";
import { ExactHighlightingProps } from "./types";
import { defaultTheme } from "./constants";
import Highlight from "./Highlight";

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
                {highlightedContent.map(({ content, highlighted }) => (<Highlight content={content} highlighted={highlighted} theme={theme} />))}
            </>
        ),
        [highlightedContent]
    );
}

export default ExactHighlighting;