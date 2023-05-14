import React from 'react';

import SearchHighlight from '../Highlighting';

const SearchHighlightExample = ({ content = '', termsToHighlight = '' }: { content: string; termsToHighlight?: string }) => (
    <SearchHighlight termsToHighlight={termsToHighlight}>{content}</SearchHighlight>
);

export default SearchHighlightExample;
