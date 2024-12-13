# Frontend Documentation  - live at  - https://pankajgusain.github.io/ZyloDrive/
<details>
    <summary><h2>Project setup</h2></summary>
    
## Installation

To set up the project, you'll need Node.js and npm installed. Then, follow these steps:

1. Clone the repository or create your own project.
2. Install dependencies:

   ```bash
   npm install
   ```

3. To run the development server or build the project, follow the instructions below.

## Usage

### Development Mode

To start the development server with live-reloading, run:

```bash
npm run start
```

This will start a Webpack Dev Server on `http://localhost:3000`, and it will watch for changes in the source files.

### Production Build

To create an optimized production build, run:

```bash
npm run build
```

This will generate minified JavaScript and CSS files in the `build/` directory, with filenames containing hashes for cache-busting.
</details>

## [Figma Design Refrence](https://www.figma.com/design/giKWO3WtT5SEi0giaTz9Yr/Uber-App-UI---Free-UI-Kit-(Recreated)-(Community)?node-id=5-41&node-type=section&t=EjKyrWoZWm1KOnQC-0)


<details>
    <summary open> <h2>Images Reference</h2></summary>
    <ul>
        <li> Homepage Background Image - https://unsplash.com/photos/car-headlight-AO3VsQ_sGK8 </li>
    </ul>
</details>


<details>
    <summary open> <h2>Webpack Configuration Details</h2></summary>


This project is set up with a Webpack configuration for building modern web applications. The configuration handles JavaScript (with React support), CSS, SCSS, images, fonts, and other assets. It also includes optimizations for production and a development server for local development.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Configuration Details](#configuration-details)
- [Plugins and Loaders](#plugins-and-loaders)
- [Optimization](#optimization)
- [Development Server](#development-server)

## Features

- **JavaScript Transpilation**: Using Babel for modern JavaScript features and React support.
- **CSS and SCSS Handling**: Includes support for CSS and SCSS with modules.
- **Production Optimizations**: Code minification and asset optimization.
- **Development Server**: Hot module reloading and progress logging.
- **Assets**: Handles images, fonts, and other static assets.
- **Progress Feedback**: Displays compilation progress with a custom progress bar in the terminal.


## Configuration Details

### Entry Point

The entry point is set to `./src/index.js`, and Webpack will bundle the JavaScript starting from this file.

### Output

- In **development mode**, the output filenames will be `[name].js`.
- In **production mode**, filenames will be hashed as `[name].[contenthash].js` for cache-busting.
- The build files will be stored in the `build/` directory.

### Babel

Babel is used to transpile modern JavaScript and React JSX syntax:

- The configuration uses `@babel/preset-env` for modern JavaScript features.
- The `@babel/preset-react` is used with React's automatic JSX runtime.

### CSS and SCSS

- **CSS Modules**: Both `.css` and `.scss` files are supported with CSS modules in production.
- **PostCSS**: PostCSS is included for automatic prefixing and other transformations.
- **SASS**: SCSS files are supported with the `sass-loader`.

### Assets

- Images and fonts are handled by Webpack's asset modules.
- The configuration will copy static assets from `src/assets/` to `build/assets/`.

## Plugins and Loaders

### Plugins

1. **HtmlWebpackPlugin**: Generates an HTML file that includes the output JavaScript and CSS files.
2. **MiniCssExtractPlugin**: Extracts CSS into separate files in production mode.
3. **CopyWebpackPlugin**: Copies static assets (e.g., images) to the build directory.
4. **ProgressPlugin**: Displays build progress in the terminal with a custom progress bar.

### Loaders

1. **Babel Loader**: Transpiles modern JavaScript and JSX with Babel.
2. **CSS Loader**: Loads CSS files and supports CSS Modules.
3. **Sass Loader**: Loads SCSS files and compiles them into CSS.
4. **PostCSS Loader**: Adds vendor prefixes and other transformations to CSS.
5. **File Loader**: Handles image and font file imports.

## Optimization

In **production mode**, the following optimizations are enabled:

1. **Minification**: JavaScript and CSS files are minified using `TerserPlugin` and `CssMinimizerPlugin`.
2. **Code Splitting**: Split the code into separate chunks for better caching.
3. **Runtime Chunk**: Adds a separate runtime chunk for better long-term caching.

## Development Server

The development server is configured to run at `http://localhost:3000` and includes the following features:

- **Hot Module Replacement**: Automatically updates the app when code changes.
- **Error and Warning Overlay**: Displays error/warning overlays in the browser.
- **Progress**: Displays progress during compilation in the terminal.

</details>
