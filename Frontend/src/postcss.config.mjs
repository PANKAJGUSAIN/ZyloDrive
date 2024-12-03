import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default (ctx) => {
    const isProduction = ctx.env === 'production';
    return {
        plugins: [
            autoprefixer, // Automatically add vendor prefixes
            ...(isProduction ? [cssnano] : []), // Minify CSS in production
        ],
    };
};