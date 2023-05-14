import React from 'react';

import { HighlightingProvider } from '../..';

import Content from './Content';
import Modes from './Modes';
import SearchBar from './components/SearchBar';


const Highlighting = () => {
    return (
        <HighlightingProvider>
            <SearchBar />
            <br />
            <Modes />
            <br />
            <h2>List of projects</h2>
            <Content />
        </HighlightingProvider>
    );
};

export default Highlighting;