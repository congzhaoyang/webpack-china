// module.exports = {
//   parser: file.extname === '.sss' ? 'sugarss' : false,
//   plugins: {
//     'postcss-import': {},
//     'postcss-cssnext': {},
//     'cssnano': {},
//     'autoprefixer': {browserslist: ["last 2 versions"]},
//   }
// }


module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}