import type { Plugin } from 'vite';
import { createFilter } from '@rollup/pluginutils';
import { transformSync } from '@babel/core';

interface Json {
  [index: string]: unknown;
}

type Plugins = string | [string, Json];

// Babel plugins list for jsx plus
const babelPlugins: Plugins[] = [
  'babel-plugin-transform-jsx-list',
  'babel-plugin-transform-jsx-condition',
  'babel-plugin-transform-jsx-memo',
  'babel-plugin-transform-jsx-slot',
  ['babel-plugin-transform-jsx-fragment', { moduleName: 'react' }],
  'babel-plugin-transform-jsx-class',
];

export default function jsxPlusPlugin(): Plugin {
  return {
    name: 'vite-plugin-jsx-plus',
    enforce: 'pre',

    transform(code, id) {
      const filter = createFilter(/\.[jt]sx$/);

      if (filter(id)) {
        if (id.endsWith('.tsx')) {
          babelPlugins.push([
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            require('@babel/plugin-transform-typescript'),
            { isTSX: true, allowExtensions: true },
          ]);
        }

        const result = transformSync(code, {
          babelrc: false,
          ast: true,
          plugins: babelPlugins,
          sourceMaps: true,
          sourceFileName: id,
          configFile: false,
        });

        return {
          code: result.code,
          map: result.map,
        };
      }
    },
  };
}
