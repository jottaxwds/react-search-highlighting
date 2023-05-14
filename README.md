# REACT SEARCH HIGHLIGHTING
`react-search-highlighting` is a React library that provides a set of components and utilities to make highlighting search terms in text content easy and customizable.

## Features

### Highlighting Component
The `<Highlighting>` component is a flexible and powerful component that highlights text content based on a set of search terms. It accepts the following props:

- `termsToHighlight`: An array of search terms to highlight in the content.
- `config`: A configuration object that allows for customization of the highlighting behavior. The config object can have the following properties:
  - `caseSensitive`: A boolean value that determines whether the search is case-sensitive or not.
  - `exactMatch`: A boolean value that determines whether the search should match exact terms or not.
  - `ignoreDiacritics`: A boolean value that determines whether the search should ignore diacritics or not.
- `prioritiseCtxConfig`: By default `<Highlighting>` applies direct config passed to it on its `config` prop, however, if used inside of a `HighlightingProvider` the preference of the config used can be modified. By default, the direct `config` passed as a prop to it will take preference over a `config` passed by context.
- `theming`: Basic & just a few style overrides. **DISCLAIMER: Ensure good a11y score is met after changing this theming values.**
    - `color`: font color of the highlighted content (default black)
    - `background`: To override default `<mark>` background on highlighted content.
    - `fontWeight`: To override default `<mark>` font weight and make it bolder/lighter.

### Highlighting Provider
The `<HighlightingProvider>` component is a context provider that holds the current termsToHighlight value to be updated by another component in the page, such as a search bar or input field. This allows for easy sharing of the termsToHighlight value across multiple components.

### useHighlighting Hook
The useHighlighting hook is a simple and easy-to-use hook that allows for consuming the context value of the termsToHighlight and also provides a updateTermsToHighlight function to update the context value.

## Getting Started
To use `react-search-highlighting`, you can install it from npm:

```bash
npm install @jottaxwds/react-search-highlighting
```
Then, import the components and utilities you need:

```javascript
import { Highlighting, HighlightingProvider, useHighlighting } from '@jottaxwds/react-search-highlighting';
```

And start using them in your React application!

```javascript
function MyComponent() {
  const { termsToHighlight, updateTermsToHighlight } = useHighlighting();

  return (
    <div>
      <HighlightingProvider>
        <input type="text" onChange={(e) => updateTermsToHighlight(e.target.value)} />
        <Highlighting termsToHighlight={termsToHighlight}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Highlighting>
      </HighlightingProvider>
    </div>
  );
}
```
With `react-search-highlighting`, you can easily highlight search terms in your text content with a flexible and customizable set of components and utilities!

## Future goals for v2.0.0:
 - Use `React components` as a `children`: Sometimes it can be needed to apply highlighting over complex components that does not expose `string` to highlight. It can be the case of a `<FormattedMessage>` from `react-intl` or any other component in which we can not pass a `string` as a `children` of the `<Highlighting>`.