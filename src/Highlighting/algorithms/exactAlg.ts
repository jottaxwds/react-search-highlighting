import { GetHighlightedStringContentArgs, HighlightedContent } from "../types"
import { cleanDiacritics } from "../utils"

function splitContent ({ termsToHighlight, content, config }: GetHighlightedStringContentArgs): string[] {
    const flags = config.caseSensitive ? 'g' : 'gi'
    const regex = new RegExp(`(.*?)(\\b${config.ignoreDiacritics ? cleanDiacritics(termsToHighlight) : termsToHighlight}\\b)`, flags)
    return (config.ignoreDiacritics ? cleanDiacritics(content) : content).split(regex).filter(Boolean)
  }
  
  const getOriginalContentParts = (originalContent, alteredContentParts): string[] => {
    let buffer = 0
    return alteredContentParts.reduce((result, current) => {
      const newChunk = originalContent.substring(buffer, buffer + current.length)
      buffer = buffer + current.length
      return [...result, newChunk]
    }, [] as string[])
  }
  
  export const exactHighlight = ({ termsToHighlight, content, config: { caseSensitive, ignoreDiacritics } }: GetHighlightedStringContentArgs): HighlightedContent[] => {
    const alteredContentParts = splitContent({ termsToHighlight, content, config: { exactMatch: true, caseSensitive, ignoreDiacritics } })
    const originalContentParts = getOriginalContentParts(content, alteredContentParts)
    const termsToHighlightToMatch = ignoreDiacritics ? cleanDiacritics(!caseSensitive ? termsToHighlight.toLowerCase() : termsToHighlight) : !caseSensitive ? termsToHighlight.toLowerCase() : termsToHighlight
    const output = originalContentParts.reduce<HighlightedContent[]>((result, current, index) => {
      const contentPart = ignoreDiacritics ? cleanDiacritics(!caseSensitive ? current.toLowerCase() : current) : !caseSensitive ? current.toLowerCase() : current
      return [...result, { content: current, highlighted: termsToHighlightToMatch === contentPart }]
    }, [])
    return output
  }