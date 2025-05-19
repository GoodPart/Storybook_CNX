// module.exports = {
//     stories: [
//       { type: 'react', url: 'http://localhost:6006' },  // React Storybook 인스턴스
//       { type: 'core', url: 'http://localhost:6007' },   // Core Storybook 인스턴스
//     ],
//     framework : '@storybook/html-vite',
//     refs : {
//       react : {
//         title : 'React',
//         url : "http://localhost:6006"
//       },
//       core : {
//         title : 'Core',
//         url : "http://localhost:6007"
//       },
//     }
//   };
  



const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    // "../storybook-react/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    // "../storybook-core/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  "core" : {
    "builder": '@storybook/builder-vite',
  },
  "addons": [
    "@storybook/addon-essentials",
    '@storybook/addon-docs',
    // "@storybook/addon-onboarding",
    // "@storybook/experimental-addon-test",
    // "@chromatic-com/storybook",
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    "@storybook/addon-designs"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    // "name" : "@storybook/builder-vite",
    "options": {
      "integrations" : [
        "core",
        'react'
      ]
    }
  },
  
  "refs" : {
    "react" : {
      "title" : 'Story React',
      // "url" : "http://localhost:6007",
      "url" : "https://680f166c503340b7f8dc673c-bhuvuypnys.chromatic.com/"
    },
    "core" : {
      "title" : 'Story Core',
      // "url" : "http://localhost:6006"
      "url" : "https://6811cce941aa148a7430baf9-qxnuyahwcv.chromatic.com/"
    },
    "vue" : {
      "title" : 'Story Vue',
      // "url" : "http://localhost:6005"
      "url" : "https://682ac05a8d778afb4429b1b0-memfefripa.chromatic.com/"
    },
  }
};
export default config;