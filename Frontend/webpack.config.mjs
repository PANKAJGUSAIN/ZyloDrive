import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import chalk from 'chalk'
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import dotenv from 'dotenv';
import { GenerateSW } from 'workbox-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let isComplete = false;

// Load environment variables from .env file
dotenv.config();

const config = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.js',
        output: {
            filename: isProduction ? '[name].[contenthash].js' : '[name].js',
            path: path.resolve(__dirname, 'build'),
            publicPath: '/ZyloDrive/', // changed from '/' to '/repname' ZyloDrive/
            clean: true,
            assetModuleFilename: 'assets/[hash][ext][query]', // Organize images/fonts
        },
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'source-map' : 'eval-source-map',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: path.resolve(__dirname, 'src'), // Only transpile files in src
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                '@babel/preset-env',
                                ['@babel/preset-react', { runtime: 'automatic' }]
                            ],
                        },
                    },
                },
                {
                    test: /\.module\.css$/, // Handle CSS modules
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    auto: true,
                                    localIdentName: isProduction ? '[hash:base64]' : '[name]__[local]__[hash:base64:5]',
                                },
                            },
                        },
                        'postcss-loader', // Add PostCSS loader
                    ],
                },
                {
                    test: /\.module\.scss$/, // Handle SCSS modules
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    auto: true,
                                    localIdentName: isProduction ? '[hash:base64]' : '[name]__[local]__[hash:base64:5]',
                                },
                            },
                        },
                        'postcss-loader', // Add PostCSS loader
                        'sass-loader',
                    ],
                },
                {
                    test: /\.scss$/, // Handle regular SCSS files
                    exclude: /\.module\.scss$/, // Exclude module files
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'postcss-loader', // Add PostCSS loader
                        'sass-loader',
                    ],
                },
                {
                    test: /\.css$/, // Handle regular CSS files
                    exclude: /\.module\.css$/, // Exclude module files
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'postcss-loader', // Add PostCSS loader
                    ],
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    type: 'asset/resource',
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
        },
        devServer: {
            static: path.join(__dirname, 'public'),
            historyApiFallback: true,
            compress: true,
            port: 3001,
            hot: true,
            open: true,
            liveReload:true,// Ensures files auto-reload
            client: {
                overlay: {
                    warnings: true,
                    errors: true,
                },
                logging: 'warn',
                progress: true, // Show progress during compilation
            },
            // Use devMiddleware to configure logging
            devMiddleware: {
                stats: {
                    all: false, // Set to false to use specific options
                    assets: false, // Show asset information
                    errors: true, // Show errors
                    warnings: true, // Show warnings
                    modules: false, // Show module information
                    entrypoints: false, // Show entry point information
                    timings: false, // Show timings
                },
            },
        },
        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserPlugin({
                    parallel:true, // Enables parallel processing
                    terserOptions: {
                        compress: {
                            drop_console: isProduction,
                        },
                    },
                }),
                new CssMinimizerPlugin({
                    parallel: true, // Uses multiple cores
                }),
            ],
            splitChunks: {
                chunks: 'all'
            },
            runtimeChunk: {
                name: 'runtime',
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
                minify: isProduction ? {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                } : false,
            }),
            new MiniCssExtractPlugin({
                filename: isProduction ? '[name].[contenthash].css' : '[name].css',
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'src/assets',
                        to: 'assets',
                        globOptions: { ignore: ['**/.gitkeep'], },
                    },
                    {
                        from: 'public/manifest.json', // Copy manifest.json
                        to: 'manifest.json',
                    }

                ],
            }),
            new webpack.ProgressPlugin((percentage, message) => {
                const color = percentage === 1 ? chalk.bold.bgMagenta : chalk.bold.bgGrey; // Green for complete, Cyan for progress
                // Check if progress is complete
                if (percentage === 1 && !isComplete) {
                    isComplete = true
                    console.log(`${color('         ' + '100% - complete!' + '         ')}`);
                } else {
                    // Use \r to overwrite the current line
                    process.stdout.write(`${color('         ' + (percentage * 100).toFixed(2) + '%' + '  ' + ' - ' + message + '         ')} \r`);
                }

            }),
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(process.env)
            }),
            isProduction ?  new GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
                maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // Increase limit for UI caching
                navigateFallback: '/ZyloDrive/index.html', // Ensures SPA works offline
                runtimeCaching: [
                    // Cache static assets (JS, CSS, HTML)
                    {
                        urlPattern: /\.(?:js|css|html)$/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'static-assets',
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
                            },
                        },
                    },
                    // Cache images & fonts
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|svg|woff|woff2|ttf|otf)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'image-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
                            },
                        },
                    },
                    // Cache API responses
                    {
                        urlPattern: /^https:\/\/zylo-drive.vercel.app.com\/maps(\/.*)?$/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'maps-api-cache',
                            expiration: {
                                maxEntries: 20, // Cache only 20 responses
                                maxAgeSeconds: 12 * 60 * 60, // Cache for 12 hours
                            },
                        },
                    },
                ],
            })
            : null,
            // new webpack.DefinePlugin(envKeys), // Add DefinePlugin to inject environment variables
        ].filter(Boolean), // Remove null values
    };
};
export default config
