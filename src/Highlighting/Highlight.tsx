import React from 'react';

import uniqueId from "lodash/uniqueId";
import { HighlightingTheme } from "./types";

interface Highlight {
    highlighted: boolean
    content: string
    theme: HighlightingTheme
};

const Highlight = ({ highlighted, content, theme }) => (highlighted ? (
    <mark key={uniqueId('highlighted')} style={{ ...theme }} data-testid="highlighted">{content}</mark>
) : (
    <span key={uniqueId('not-highlighted')}>{content}</span>
));

export default Highlight;