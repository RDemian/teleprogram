"Телепрограмма"
Список каналов и телепередач Domru.
Проект на React с Redux.

Запуск проекта:

- Установить зависимости: npm i
- Запусить проект: npm start

module.exports = {
    module: {
      rules: [
        {
          test: /(\.jsx|\.js)$/,
          loader: 'babel-loader',
          exclude: /(node_modules|bower_components)/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ],
    },
  };