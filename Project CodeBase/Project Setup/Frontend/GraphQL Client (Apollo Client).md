---
To Do: false
trello_plugin_note_id: -ST8_QxEwtXzQ4KT89M9i
trello_board_card_id: 65c220bf14f6c41810a2283e;65c32acc1e17947f566dd80e
---



```bash
npm install @apollo/client graphql
```

## Default Setup
```tsx
import ReactDOM from 'react-dom/client'
import App from './App'

import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})


client.query({ query })
  .then((response) => {
    console.log(response.data)
  })


ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

## Apollo Provider in React
```tsx
import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
  

const client = new ApolloClient({

uri: "http://localhost:4000",

cache: new InMemoryCache(),

});
  

ReactDOM.render(

<React.StrictMode>

	<ApolloProvider client={client}>
	
		/** Pages here **/
	
	</ApolloProvider>

</React.StrictMode>,

document.getElementById("root")

);
```