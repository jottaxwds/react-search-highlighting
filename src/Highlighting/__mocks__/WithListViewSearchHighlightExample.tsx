import React from 'react';

import { HighlightingProvider } from '..';

import Content from './Content';
import SearchBar from './SearchBar';
import { HighlightingConfig } from '../types';

const WithListViewSearchHighlightExample = ({ config }: { config?: HighlightingConfig}) => (
    <HighlightingProvider config={config}>
        <SearchBar />
        <br />
        <br />
        <br />
        <h2>List of projects</h2>
        <Content />
    </HighlightingProvider>
);

export default WithListViewSearchHighlightExample;
