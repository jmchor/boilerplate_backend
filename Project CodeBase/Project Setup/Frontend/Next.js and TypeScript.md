---
To Do: false
trello_plugin_note_id: tiJiBRUmq8mb9ED8_oHBB
trello_board_card_id: 65c220bf14f6c41810a2283e;65c32af31cdc4159ae57ecc0
---

To set up a Next.js app, use 

```bash
npx create-next-app@latest
``` 

and go through the options presented to you (if you want to set up TypeScript etc.)

## GraphQL with NextJS
To make use of the Apollo Provider, the default App file in Next needs to be modified:

```bash
# create _app.js file in pages folder
cd pages
touch _app.js
```


```tsx
// pages/_app.js

import { ApolloProvider } from '@apollo/client';
import { createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('app-user-token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    };
  });

  const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;



```