import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs"
    },
    rules: {
      'comma-dangle': ['error', {
			'arrays': 'never',
			'objects': 'never',
			'imports': 'never',
			'exports': 'never',
			'functions': 'never'
		}],
      'no-unused-vars': ['warn'],
      'no-console': 'off',
    },
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  pluginJs.configs.recommended,
];
