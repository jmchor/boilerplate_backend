---
To Do: false
---

### TypeScript

```bash
npm install --save-dev ts-node typescript
```

### Backend

##### Database: MongoDB --> Atlas:
- mongoose
- dotenv
- jwt

```bash
npm install mongoose dotenv jsonwebtoken
```
##### Node.js
- npm init

###### [[GraphQL Server (Apollo Server)]]:

.eslintrc

```json 
{
	"parser": "@babel/eslint-parser",

	"overrides": [
		{
			"extends": ["wesbos", "eslint:recommended", "plugin:prettier/recommended"],

			"parserOptions": {
				"project": ["./tsconfig.json"], // Specify it only for TypeScript files
				"ecmaVersion": "latest",
				"sourceType": "module"
			},
			
			"rules": {
				"no-console": 0,
				"semi": "off",
				"@typescript-eslint/semi": ["error", "never"]

				// note you must disable the base rule as it can report incorrect errors
			}
		}
	]
}

```

.prettierrc
```json 
{
	"trailingComma": "es5",
	"singleQuote": true,
	"printWidth": 120,
	"useTabs": true,
	"tabWidth": 8,
	"semicolons": true,
	"bracketSpacing": true,
	"arrowParens": "always",
	"endOfLine": "auto"
}

```




### Frontend
[[Next.js and TypeScript]]
[[GraphQL Client (Apollo Client)]]

.eslintrc.cjs

```js
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ],
    "no-case-declarations": "off"
  },
};


```

