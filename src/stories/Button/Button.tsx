import React from 'react';
import * as Bt from "../../../storybook-react/src/stories/Button";
import buttonStories from '../../../storybook-core/src/stories/Button/button.stories';

// export const Button = () => <Bt />

export const ButtonCore = () => {
  return (
    <iframe
      src="http://localhost:6006/?path=/docs/button--Primary&full=1&shortcuts=true&singleStory=true"
      width="300px"
      height="300px"
    ></iframe>
  );
};


export const ButtonReact = () => {
  return (
    <iframe
      src="http://localhost:6007/?path=/docs/button--Primary&full=1&shortcuts=true&singleStory=true"
      width="300px"
      height="300px"
    ></iframe>
  );
};
