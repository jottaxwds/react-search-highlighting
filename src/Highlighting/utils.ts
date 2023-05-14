import { HighlightedContent, GetHighlightedStringContentArgs } from './types'
import { regexpIgnoreDiacritics } from './constants'
import { nonExactHighlight } from './algorithms/nonExactAlg'
import { exactHighlight } from './algorithms/exactAlg'

export const cleanDiacritics = (term = ''): string => term.normalize('NFD').replace(regexpIgnoreDiacritics, '')

export const containDiacritics = (char: string): boolean => char !== cleanDiacritics(char)

export const getHighlightedStringContent = ({ termsToHighlight, content, config }: GetHighlightedStringContentArgs): HighlightedContent[] => {
  const highlightedContent = config.exactMatch ? exactHighlight({ termsToHighlight, content, config }) : nonExactHighlight({ termsToHighlight, content, config })
  return highlightedContent
}

export function validateElement(element: string): element is keyof JSX.IntrinsicElements {
  return element in document.createElement(element);
}