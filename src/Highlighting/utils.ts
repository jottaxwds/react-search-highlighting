import { HighlightedContent, GetHighlightedStringContentArgs } from './types'
import { regexpIgnoreDiacritics } from './constants'
import { nonExactHighlight } from './algorithms/nonExact'
import { exactHighlight } from './algorithms/exact'

export const cleanDiacritics = (term = ''): string => term.normalize('NFD').replace(regexpIgnoreDiacritics, '')

export const containDiacritics = (char: string): boolean => char !== cleanDiacritics(char)

export const getHighlightedStringContent = ({ termsToHighlight, content, config }: GetHighlightedStringContentArgs): HighlightedContent[] => {
  const highlightedContent = config.exactMatch ? exactHighlight({ termsToHighlight, content, config }) : nonExactHighlight({ termsToHighlight, content, config })
  return highlightedContent
}