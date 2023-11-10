import { defineConfig } from 'umi'
import routes from './router.config'
const path = require('path')
const genericName = require('generic-names')
const generateRule = '[name]__[local]___[hash:base64:5]'
const generateIdentName = genericName(generateRule, {
  context: __dirname,
})

export default defineConfig({
  hash: true,
  routes,
  plugins: ['@umijs/plugins/dist/dva'],
  dva:{},
  alias: {
    '@': path.resolve(__dirname, '../src'),
    '@@@': path.resolve(__dirname, '../src/components'),
    '@assets': path.resolve(__dirname, '../src/assets/images'),
  },
  manifest: {
    basePath: '/',
  },
  extraBabelPlugins: [
    [
      'react-css-modules',
      {
        exclude: 'node_modules', // 排除 node_modules 所有 css 不走 styleName编译
        generateScopedName: (a, b) => generateIdentName(a, b), // 哈希规则
        filetypes: { // 哪些后缀走 sytleName解析
          '.less': {
            syntax: 'postcss-less',
          },
        },
      },
    ],
  ],
  cssLoader: {
    modules: {
      auto: function (opt) {
        // 这2个文件不走 styleName 编译
        const index = path.normalize('src/styles/index.less')
        const components = path.normalize('src/components')

        return !opt.includes('node_modules')
          && !opt.includes(index)
          && !opt.includes(components)
      },
      getLocalIdent: (loaderContext, localIdentName, localName, options) => {
        const { resourcePath } = loaderContext
        console.log(generateIdentName(localName, resourcePath))
        return generateIdentName(localName, resourcePath)
      },
    },
  },
})
