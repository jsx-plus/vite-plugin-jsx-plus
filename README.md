# vite-plugin-jsx-plus

在 [Vite](https://vitejs.dev/) 应用中快速使用 [jsx-plus](https://github.com/jsx-plus/jsx-plus) 语法。

## 用法

### npm/yarn

```shell
npm i --save-dev vite-plugin-jsx-plus

# or

yarn add --dev vite-plugin-jsx-plus
```

### 使用

在 `vite.config.ts` 中引入：

```ts
import jsxPlusPlguin from 'vite-plugin-jsx-plus';

// vite.config.ts
export default defineConfig({
  plugins: [vue(), jsxPlusPlguin()]
})
```

## License

MIT
