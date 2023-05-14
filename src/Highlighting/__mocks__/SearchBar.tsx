import React from 'react';

import useHighlighting from '../useHighlighting';

const SearchBar = () => {
    const { updateTermsToHighlight } = useHighlighting();

    return (
        <header>
            <input onChange={({ target : { value }}) => updateTermsToHighlight(value)} id="search-bar" data-testid="search-bar" name="search-bar" />
        </header>
    );
};

export default SearchBar;
