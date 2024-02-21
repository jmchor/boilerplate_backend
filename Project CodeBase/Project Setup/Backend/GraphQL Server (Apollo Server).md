---
To Do: false
trello_plugin_note_id: cgP5BDtD7iSZnsqnSjTpp
trello_board_card_id: 65c220bf14f6c41810a2283e;65c31701ed4d74e46157fff8
---

NPM packages:
```bash 
npm install @apollo/server graphql
```

Initial code structure:
```tsx
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import jwt from "jsonwebtoken";
import { User } from "./models"; // Assuming User model is imported from models file

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      if (!req || !req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return {};
      }

      const token = req.headers.authorization.split(' ')[1];
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      } catch (error) {
        return {};
      }
    }
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();


```
