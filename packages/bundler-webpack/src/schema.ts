import type { Root } from '@hapi/joi';
import { CSSMinifier, JSMinifier, Transpiler } from './types';

const options = [
  'cheap-source-map',
  'cheap-eval-source-map',
  'cheap-hidden-source-map',
  'cheap-inline-source-map',
  'cheap-module-source-map',
  'cheap-module-eval-source-map',
  'cheap-module-hidden-source-map',
  'cheap-module-inline-source-map',
  'eval',
  'eval-source-map',
  'source-map',
  'hidden-source-map',
  'inline-source-map',
];

const DEVTOOL_REGEX = new RegExp(
  '^' + // start of string
    '(#@|@|#)?' + // maybe one of the pragmas
    `(${options.join('$|')})`, // one of the options
);

export function getSchemas(): Record<string, (Joi: Root) => any> {
  return {
    alias: (Joi) => Joi.object(),
    autoCSSModules: (Joi) => Joi.boolean(),
    chainWebpack: (Joi) => Joi.function(),
    copy: (Joi) =>
      Joi.array().items(
        Joi.alternatives().try(
          Joi.object({
            from: Joi.string(),
            to: Joi.string(),
          }),
          Joi.string(),
        ),
      ),
    cssLoader: (Joi) => Joi.object(),
    cssLoaderModules: (Joi) => Joi.object(),
    cssMinifier: (Joi) =>
      Joi.string().valid(
        CSSMinifier.cssnano,
        CSSMinifier.esbuild,
        CSSMinifier.none,
      ),
    cssMinifierOptions: (Joi) => Joi.object(),
    define: (Joi) => Joi.object(),
    depTranspiler: (Joi) =>
      Joi.string().valid(
        Transpiler.babel,
        Transpiler.esbuild,
        Transpiler.swc,
        Transpiler.none,
      ),
    devtool: (Joi) =>
      Joi.alternatives().try(Joi.string().regex(DEVTOOL_REGEX), Joi.boolean()),
    externals: (Joi) =>
      Joi.alternatives().try(
        Joi.object().pattern(/.+/, [
          Joi.string(),
          Joi.boolean(),
          Joi.object().pattern(/.+/, [Joi.string(), Joi.boolean()]),
        ]),
        Joi.string(),
        Joi.func().arity(3),
        Joi.object().regex(),
      ),
    extraBabelPlugins: (Joi) =>
      Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.alternatives().try(Joi.string(), Joi.object())),
      ),
    extraBabelPresets: (Joi) =>
      Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.alternatives().try(Joi.string(), Joi.object())),
      ),
    extraPostCSSPlugins: (Joi) => Joi.array(),
    fastRefresh: (Joi) => Joi.boolean(),
    hash: (Joi) => Joi.boolean(),
    ignoreMomentLocale: (Joi) => Joi.boolean(),
    jsMinifier: (Joi) =>
      Joi.string().valid(
        JSMinifier.esbuild,
        JSMinifier.swc,
        JSMinifier.terser,
        JSMinifier.uglifyJs,
        JSMinifier.none,
      ),
    jsMinifierOptions: (Joi) => Joi.object(),
    lessLoader: (Joi) => Joi.object(),
    mfsu: (Joi) => Joi.alternatives(Joi.object(), Joi.boolean()),
    outputPath: (Joi) => Joi.string(),
    postcssLoader: (Joi) => Joi.object(),
    proxy: (Joi) => Joi.object(),
    publicPath: (Joi) => Joi.string(),
    purgeCSS: (Joi) => Joi.object(),
    sassLoader: (Joi) => Joi.object(),
    srcTranspiler: (Joi) =>
      Joi.string().valid(
        Transpiler.babel,
        Transpiler.esbuild,
        Transpiler.swc,
        Transpiler.none,
      ),
    styleLoader: (Joi) => Joi.object(),
    svgr: (Joi) => Joi.object(),
    svgo: (Joi) => Joi.alternatives().try(Joi.object(), Joi.boolean()),
    targets: (Joi) => Joi.object(),
    writeToDisk: (Joi) => Joi.boolean(),
  };
}