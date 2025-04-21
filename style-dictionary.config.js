// const StyleDictionary = require('style-dictionary');

module.exports = {
  source: ['./src/shared/design_token/*.json'],
  platforms: {
    // vanillaExtract: {
    //   buildPath: './src/shared/design_token/',
    //   files: [{
    //       destination: 'theme.ts',
    //       format: 'vanillaExtract/js'
    //     }]
    // },
    scss: {
      transformGroup: 'scss',
      buildPath: './src/shared/design_token/',
      files: [{
        destination: '_variables.scss',
        format: 'scss/variables'
      }]
    },
    css : {
      transformGroup: 'css',
      buildPath: './src/shared/design_token/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables'
      }]
    }
  }
};