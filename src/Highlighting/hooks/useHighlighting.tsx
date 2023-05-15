import React from 'react';

import { HighlightingContext } from '../HighlightingContext';

const useHighlighting = () => {
    const { termsToHighlight, updateTermsToHighlight, config, updateConfig } = React.useContext(HighlightingContext);
    return {
        termsToHighlight,
        config,
        updateTermsToHighlight,
        updateConfig,
    };
};

export default useHighlighting;
