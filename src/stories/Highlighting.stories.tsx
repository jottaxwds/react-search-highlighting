import React from 'react';

import Highlighting from '../Highlighting/Highlighting';
import HighlightingExample from './views/Highlighting';

export default {
  title: 'Example/Highlighing',
  component: Highlighting,
};
const ReactTemplate = () => <HighlightingExample />;

export const ReactStory = ReactTemplate.bind({});
ReactStory.args = {};
