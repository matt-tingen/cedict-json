import mt from '@matt-tingen/eslint-config';

export default [
  // https://github.com/antfu/eslint-config-flat-gitignore/issues/18
  // mt.configs.gitignore(import.meta.dirname),
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        projectService: true,
      },
    },
  },
  ...mt.configs.recommended,
];
