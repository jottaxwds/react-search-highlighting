import { escapeRegExp } from "lodash"
import { PartialHighlightingConfig, GetContentPartsToHighlightArgs, GetHighlightedStringContentArgs, HighlightedContent } from "../types"
import { cleanDiacritics, containDiacritics } from "../utils"

const getSanitizedStringByConfig = (term: string, config: PartialHighlightingConfig): string => {
  const { ignoreDiacritics, caseSensitive } = config
  let sanitizedTerm = ignoreDiacritics ? cleanDiacritics(term) : term
  if (!caseSensitive) {
    sanitizedTerm = sanitizedTerm.toLowerCase()
  }
  return sanitizedTerm
}

const buildRegexpContent = (searchTerm: string): string => {
  let result = ''
  for (let i = 0; i < searchTerm.length; i += 1) {
    const newTerm = containDiacritics(searchTerm[i])
      ? `[${escapeRegExp(cleanDiacritics(searchTerm[i]))}${escapeRegExp(searchTerm[i])}]`
      : searchTerm[i]
    result = `${result}${newTerm}`
  }
  return result
}

const buildRegexp = (searchTermPart: string, caseSensitive: boolean): RegExp => new RegExp(`(${buildRegexpContent(searchTermPart)})`, `g${caseSensitive ? '' : 'i'}`)

// Creates an array of regex based on a given search terms and given config
const getNonExactRegexesFromTerms = (searchTermParts: string[], config: PartialHighlightingConfig) => {
  if (searchTermParts.length === 0) {
    return []
  }
  const exactHighlightParts = searchTermParts.map((searchTermPart) => {
    let sanitizedSearchTermPart = getSanitizedStringByConfig(searchTermPart, config)
    const regexPart = buildRegexp(sanitizedSearchTermPart, config.caseSensitive)
    return regexPart
  })
  return exactHighlightParts
}

const getContentPartsToHighlight = ({ termParts, content, config }: GetContentPartsToHighlightArgs): string[] => {
  let parts = [content]
  termParts.forEach((searchTermPart: string) => {
    const offset = searchTermPart.length
    const sanitizedSearchTermPart = getSanitizedStringByConfig(searchTermPart, config)
    for (let start = 0; start < content.length;) {
      const end = start + offset
      const contentPart = content.substring(start, end)
      const sanitizedContentPart = getSanitizedStringByConfig(contentPart, config)
      if (sanitizedContentPart === sanitizedSearchTermPart) {
        parts = parts
          .flat()
          .map((part) => part.split(buildRegexp(contentPart, config.caseSensitive)))
          .flat()
          .filter((part) => part !== '')
        start += offset
      } else {
        start += 1
      }
    }
  });
  return parts
}

const isNonExactHighlighted = (part: string, regexes: RegExp[], config: PartialHighlightingConfig): boolean => regexes.some((regex) => (config.ignoreDiacritics ? cleanDiacritics(part) : part).match(regex));

const highlightNonExactContent = (parts: string[], regexes: RegExp[], config: PartialHighlightingConfig): HighlightedContent[] => {
  const defaultHighlightedContent = [
    {
      content: parts.join(''),
      highlighted: false
    }
  ]

  const highlightedContent = parts.reduce((result: HighlightedContent[], currentPart, index) => {
    const newResults = [...result] as HighlightedContent[]

    const prevResult = newResults[newResults.length - 1]
    const isPrevResultHighlighted = prevResult?.highlighted ?? false
    const nextPart = parts[index + 1]

    const isCurrentPartHighlighted = isNonExactHighlighted(currentPart, regexes, config)
    const isNextElementHighlighted = nextPart !== undefined ? isNonExactHighlighted(nextPart, regexes, config) : undefined

    const whiteSpaceShouldBeHighlighted = prevResult && isPrevResultHighlighted === isNextElementHighlighted
    const partHasSameHighlightThanPrevious =
            prevResult &&
            ((isCurrentPartHighlighted && isPrevResultHighlighted) || (!isCurrentPartHighlighted && !isPrevResultHighlighted))

    if ((currentPart === ' ' && whiteSpaceShouldBeHighlighted) || (currentPart !== ' ' && partHasSameHighlightThanPrevious)) {
      prevResult.content = `${prevResult.content}${currentPart}`
      return newResults
    }
    newResults.push({
      content: currentPart,
      highlighted: isCurrentPartHighlighted
    })
    return newResults
  }, [])
  return (highlightedContent.length > 0) ? highlightedContent : defaultHighlightedContent
}

export const nonExactHighlight = ({ termsToHighlight, content, config }: GetHighlightedStringContentArgs): HighlightedContent[] => {
  const termParts = termsToHighlight && termsToHighlight.trim().length ? termsToHighlight.trim().split(' ') : []
  let parts = [content]
  if ((termParts.length > 0) && content) {
    parts = getContentPartsToHighlight({ termParts, content, config })
  }
  const regexes = getNonExactRegexesFromTerms(termParts, config)
  const highlightedContent = content
    ? highlightNonExactContent(parts, regexes, config)
    : [
        {
          content,
          highlighted: false
        }
      ]
  return highlightedContent
}