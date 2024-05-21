const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const userCaseID = 'TLR_EPRC_SPRC_INQ_UC3_RPT_EPRC';



module.exports = defineConfig({
  publicPath: 'auto',
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: `${userCaseID}`,
        filename: 'remote-entry.js',
        library: { type: 'var', name: `${userCaseID}` },
        exposes: {
          './usecase': `./src/UseCase/${userCaseID}/${userCaseID}.js`
        },
        
        shared: require("./shared.json")

      }),
      
    ],
    
    
  },
  transpileDependencies: true,
});
