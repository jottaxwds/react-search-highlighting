import React from 'react';

import { HighlightingProviderProps, State } from './types';
import { defaultConfig } from './constants';

const initialState = {
    termsToHighlight: '',
    config: { ...defaultConfig },
    updateTermsToHighlight: () => {},
    updateConfig: () => {},
};

const HighlightingContext = React.createContext<State>(initialState);

function HighlightingProvider({ children, config: highlightingConfig }: HighlightingProviderProps) {
    const [termsToHighlight, updateTermsToHighlight] = React.useState('');
    const [config, updateConfig] = React.useState(highlightingConfig ?? initialState.config);
    React.useEffect(() => {
        updateConfig(config);
    }, [config]);
    const state = {
        termsToHighlight,
        config,
    }
    const updateState = {
        updateTermsToHighlight,
        updateConfig,
    }
    return <HighlightingContext.Provider value={{...state, ...updateState}}>{children}</HighlightingContext.Provider>;
}
export { HighlightingContext, HighlightingProvider };
