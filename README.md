# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Project structure based on CLEAN architecture

```
src/
--application/ (init)
--assets/ (icons, fonts and other static assets)
--features/ (domain specific)
----[name]/
------components/ (React components that can be reused)
------data/
--------entities/ (data objects for using inside the app. Usualy classes with static methods "fromApi", "fromJson", "fromGraphl" etc. to map BE entities into the App's own items. They provide ability not to make lot of changes through the app in case of BE changes)
--------services/ (functions for comunicating with BE)
------hoc (High Order Components)
------model (Business logic. In the most cases custom hooks are placed here.)
------pages (React components that are children of Routes)
----shared (The same as feature but all its parts are reusable)
--packages (Reusable codebase that can be moved to npm package)
```

# Production url

https://shimmering-kulfi-9e24c5.netlify.app/
