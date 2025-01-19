const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/JS/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "JS/[name].[contenthash].js",
    clean: true,
  },
  mode: "production",
  module: {
    rules: [
      // Обработка CSS
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-url')({
                    url: 'rebase', // Перенаправляет пути в CSS в dist
                  }),
                ],
              },
            },
          },
        ],
      },
      // Обработка HTML
      {
        test: /\.html$/i,
        use: [
          {
            loader: "html-loader",
            options: {
              sources: {
                list: [
                  {
                    tag: "img",
                    attribute: "src",
                    type: "src",
                  },
                ],
              },
            },
          },
        ],
      },
      // Обработка изображений
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[hash][ext]",
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  plugins: [
    // Генерация HTML
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: true,
      inject: "body",
    }),
    // Извлечение CSS
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
    }),
    // Сжатие файлов
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8,
    }),
    // Копирование папки styles
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, "src/style"), to: "style" }, // Копирование всех стилей
        { from: path.resolve(__dirname, "src/jQuery"), to: "jQuery/jQuery.js" },
      ],
    }),
    // Конвертация изображений
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminGenerate,
        options: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["mozjpeg", { quality: 75 }],
            ["optipng", { optimizationLevel: 5 }],
            ["svgo"],
            ["webp", { quality: 75 }],
          ],
        },
      },
    }),
  ],
};
