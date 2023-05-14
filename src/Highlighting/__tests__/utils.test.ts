import { defaultConfig } from '../constants';
import { exactHighlight } from '../algorithms/exactAlg';
import { cleanDiacritics, getHighlightedStringContent } from '../utils';

describe('SearchHighlight utils', () => {
    describe('Clean diacritics', () => {
        it('Should return string cleaning diacritics', () => {
            const inputString = 'Weitere Ideen zu sächsisch, sächsische sprüche, sächsisch dialekt';
            const cleanedString = 'Weitere Ideen zu sachsisch, sachsische spruche, sachsisch dialekt';
            const result = cleanDiacritics(inputString);
            expect(result).toEqual(cleanedString);
        });
    });

    describe('getHighlightedContent', () => {
        it('Should return non highlighted content if no searchTerm is given', () => {
            const content = 'This is the content I want to use';
            const termsToHighlight = '';
            const highlightedContent = getHighlightedStringContent({termsToHighlight, content, config: {...defaultConfig}});
            expect(highlightedContent).toEqual([{ content: 'This is the content I want to use', highlighted: false }]);
        });
        it('Should return parts to highlight from given content based on given searchTerm', () => {
            const content = 'This is the content I want to use';
            const termsToHighlight = 'the';
            const highlightedContent = getHighlightedStringContent({termsToHighlight, content, config: {...defaultConfig}});
            expect(highlightedContent).toHaveLength(3);
        });
        it('Should add whitespaces between highlighted content as highlighted too', () => {
            const content = 'This is the content I want to use';
            const termsToHighlight = 'is';
            const highlightedContent = getHighlightedStringContent({termsToHighlight, content, config: {...defaultConfig}});
            expect(highlightedContent).toHaveLength(3);
            expect(highlightedContent[1].content).toEqual('is is');
        });
        it('Should NOT add whitespaces between different highlight statuses as highlighted', () => {
            const content = 'This is the content I want to use';
            const termsToHighlight = 'is';
            const highlightedContent = getHighlightedStringContent({termsToHighlight, content, config: {...defaultConfig}});
            expect(highlightedContent).toHaveLength(3);
            expect(highlightedContent[2].content).toEqual(' the content I want to use');
        });
    });

    describe('Exact match', () => {
        const content = 'sít Sit SÍt siT Lorem îpsum dôlor sit âmet, çonsectetûr adipîscing élît. Séd do ëiusmod têmpor încidunt ut lâbore et dolore mâgna âliqua. Ût ênim âd minim vêniam, quis nostrûd exercîtâtîon ûllamco laborîs nîsi ut âlîquip êx eâ commodo conséquat. Dûîs âute îrûre dolor in reprehenderit în vôluptâte velit esse cillûm dolore eu fugîat nûlla parîâtûr. Excepteur sînt occaecât cupidâtât non proîdent, sînt în culpa qui officia deserunt mollît anim id est laborum. Nîsi ut âlîquîp ex ea commôdo consequat. Dûîs autem vêl eûm iriûre reprehenderit in voluptâte velit esse cillum dolore eu fugiât nûlla pariatûr. Excepteur sînt occaecât cupidatat non proîdent, sînt in culpa qui officia deserunt mollit anim id est laborum.';

        it('Should highlight exact match, ignore case, ignore diacritics', () => {
            const result = exactHighlight({
                termsToHighlight: 'sit',
                content,
                config: {
                    exactMatch: true,
                    caseSensitive: false,
                    ignoreDiacritics: true,
                }
            })
            .filter(({ highlighted }) => highlighted)
            .map(({ content }) => (content));

            expect(result).toHaveLength(5);
            expect(result).toEqual([ 'sít', 'Sit', 'SÍt', 'siT', 'sit' ]);
        });

        it('Should highlight exact match, case sensitive, ignore diacritics', () => {
            const result = exactHighlight({
                termsToHighlight: 'sit',
                content,
                config: {
                    exactMatch: true,
                    caseSensitive: true,
                    ignoreDiacritics: true,
                }
            })
            .filter(({ highlighted }) => highlighted)
            .map(({ content }) => (content));

            expect(result).toHaveLength(2);
            expect(result).toEqual([ 'sít', 'sit' ]);
        });
        
        it('Should highlight exact match, case sensitive, NOT ignoring diacritics', () => {
            const result = exactHighlight({
                termsToHighlight: 'SÍt',
                content,
                config: {
                    exactMatch: true,
                    caseSensitive: true,
                    ignoreDiacritics: false,
                }
            })
            .filter(({ highlighted }) => highlighted)
            .map(({ content }) => (content));

            expect(result).toHaveLength(1);
            expect(result).toEqual([ 'SÍt' ]);
        });
        
        it('Should highlight exact match, ignoring case, NOT ignoring diacritics', () => {
            const result = exactHighlight({
                termsToHighlight: 'SÍt',
                content,
                config: {
                    exactMatch: true,
                    caseSensitive: false,
                    ignoreDiacritics: false,
                }
            })
            .filter(({ highlighted }) => highlighted)
            .map(({ content }) => (content));

            expect(result).toHaveLength(2);
            expect(result).toEqual([ 'sít', 'SÍt' ]);
        });
        
        it('Should NOT highlight exact match if no matches', () => {
            const result = exactHighlight({
                termsToHighlight: 'pepe',
                content,
                config: {
                    exactMatch: true,
                    caseSensitive: false,
                    ignoreDiacritics: false,
                }
            })
            .filter(({ highlighted }) => highlighted)
            .map(({ content }) => (content));

            expect(result).toHaveLength(0);
        });
    });
});
