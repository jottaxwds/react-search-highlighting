import { fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';

import SearchHighlightExample from '../__mocks__/SearchHighlightExample';

import WithListViewSearchHighlightExample from '../__mocks__/WithListViewSearchHighlightExample';

describe('SearchHighlight', () => {
    describe('Non exact', () => {
        let result: RenderResult;
        let searchInput: HTMLElement;
    
        beforeEach(() => {
            result = render(<WithListViewSearchHighlightExample />);
            searchInput = result.getByTestId('search-bar');
        });
        it('Should NOT highlight content if given search term do not match content', () => {
            fireEvent.change(searchInput, {
                target: { value: 'zxyve' },
            });
            const noHighlights = result.queryAllByTestId('highlighted');
            expect(noHighlights).toHaveLength(0);
        });
    
        it('Should highlight content if given search term matches content but not match case', () => {
            fireEvent.change(searchInput, {
                target: { value: 'LAboRum' },
            });
            const highlights = result.queryAllByTestId('highlighted');
            expect(highlights).toHaveLength(2);
        });
    
        it('Should highlight content if given search term matches content but not match exact', () => {
            fireEvent.change(searchInput, {
                target: { value: 'orum' },
            });
            const noHighlights = result.queryAllByTestId('highlighted');
            expect(noHighlights).toHaveLength(2);
        });
    
        it('Should highlight content if given search term matches content but not match diacritics', () => {
            fireEvent.change(searchInput, {
                target: { value: 'läbõrúm' },
            });
            const noHighlights = result.queryAllByTestId('highlighted');
            expect(noHighlights).toHaveLength(2);
        });
    
        it('Should show unaltered content if no highlight term is provided', () => {
            const text = 'This is just an example of the content were going to show';
            result = render(<SearchHighlightExample content={text} />);
            const content = result.container;
            const htmlContent = content.innerHTML;
            const { textContent } = content;
            expect(htmlContent).not.toContain('mark');
            expect(textContent).toEqual(text);
        });
    
        it('Should highlight content that contains diacritics', () => {
            const text = 'highlight me méntoncmès';
            result = render(<SearchHighlightExample content={text} termsToHighlight="me é e" />);
            const highlights = result.queryAllByTestId('highlighted');
            expect(highlights).toHaveLength(3);
            expect(highlights[0]?.textContent).toEqual('e');
            expect(highlights[1]?.textContent).toEqual('é');
            expect(highlights[2]?.textContent).toEqual('è');
        });
    });

    describe('Exact', () => {
        it('Should highlight with exact match', () => {
            const result = render(<WithListViewSearchHighlightExample config={{ exactMatch: true, caseSensitive: false, ignoreDiacritics: true }}/>);
            const searchInput = result.getByTestId('search-bar');
            fireEvent.change(searchInput, {
                target: { value: 'dolor' },
            });
            const highlights = result.queryAllByTestId('highlighted');
            expect(highlights).toHaveLength(2);
            expect(highlights[0].textContent).toEqual('dôlor');
            expect(highlights[1].textContent).toEqual('dolor');
        });
    });
});
