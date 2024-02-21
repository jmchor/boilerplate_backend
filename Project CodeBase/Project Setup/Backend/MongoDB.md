---
To Do: false
trello_plugin_note_id: 8A2zn4R07Mhx69VN3arF6
trello_board_card_id: 65c220bf14f6c41810a2283e;65c31855e2fe847341c72f59
---

Create a new project on MongoDB Atlas using this [link](https://cloud.mongodb.com/v2#/org/658598f872985f1f3d3daed7/projects/create)

Install 

```bash
npm install mongoose dotenv
```

To connect to you backend:

```js
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to', MONGODB_URI);

async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('connected to MongoDB');
  } catch (error) {
    console.log('error connection to MongoDB:', error.message);
  }
}

connectToMongoDB();

```

```MONGODB_URI``` should be set in your .env file

### Schemas
How to create [[schemas]] for your models in MongoDB