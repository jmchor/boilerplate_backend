
### Backend

```json
"scripts": {

"test": "echo \"Error: no test specified\" && exit 1",

"dev": "nodemon src/index.ts",

"build": "tsup src/index.ts"

"lint": "eslint --ext .ts .",

"start": "node build/src/index.js"

},
```