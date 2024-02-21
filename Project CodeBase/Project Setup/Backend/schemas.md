---
To Do: false
---

```js
const { Schema, model } = require('mongoose');

const newSchema = new Schema(
	{
		// whatever goes in your schema
	}
	
);

const NewModel = model('NewModel', newSchema);

module.exports = NewModel;
```
