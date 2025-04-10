/** @type { import('@storybook/html-vite').StorybookConfig } */
module.exports = {
  stories: [
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  framework: {
    name: "@storybook/html-vite",
    options: {}
  },
  docs: {},
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y"
  ],
  refs : {
    // react : {
    //   title : 'React',
    //   url : "http://localhost:6006"
    // },
    // core : {
    //   title : 'Core',
    //   url : "http://localhost:6007"
    // },
  }
  
};

// /** @type { import('@storybook/react-vite').StorybookConfig } */
// module.exports = {
//   stories: [
//     "../src/core/**/*.stories.@(js|jsx|ts|tsx)",
//     "../src/next/**/*.stories.@(js|jsx|ts|tsx)",
//   ],
//   addons: [
//     "@storybook/addon-links",
//     "@storybook/addon-essentials",
//     "@storybook/addon-interactions",
//     "@storybook/addon-a11y",
//   ],
//   framework: {
//     name: "@storybook/react-vite",  // React 및 Next.js 환경을 지원하는 Vite 프레임워크
//     options: {
//       // Next.js와 Vite 설정을 맞추기 위해 추가적인 옵션을 지정할 수 있습니다.
//       builder: "vite",  // Vite 빌더 사용
//     },
//   },
//   docs: {
//     // Docs 관련 설정
//   },
//   typescript: {
//     reactDocgen: 'react-docgen-typescript-plugin', // React 컴포넌트에서 DocGen 사용
//   },
// };
