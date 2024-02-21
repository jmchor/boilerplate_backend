---
To Do: false
trello_plugin_note_id: LpYeETX3m2Qw0xeVqIhI2
trello_board_card_id: 65c220bf14f6c41810a2283e;65c32bc44c0404b58854192f
---
 
```ts

import { ApolloServer, gql } from 'apollo-server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { startStandaloneServer } from 'apollo-server';
import { User } from './models/User'; // Assuming you have a User model

// Define custom types for different types of requests
interface HttpRequest {
  headers: {
    authorization?: string;
  };
}

interface WebSocketRequest {
  token?: string;
}

const typeDefs = gql`
  type Query {
    # Your queries
    searchArticles: [Article]
  }

  type Mutation {
    login(username: String!, password: String!): Boolean
    logout: Boolean
    createProject(name: String!): Project
  }

  type Article {
    # Article fields
  }

  type Project {
    # Project fields
  }
`;

const secretKey: string = process.env.JWT_SECRET || 'your-secret-key';

const resolvers = {
  Query: {
    searchArticles: () => {
      // Resolver logic to search for articles
      return []; // Placeholder for actual implementation
    },
  },
  Mutation: {
    login: async (_: any, { username, password }: { username: string, password: string }, { req }: { req: HttpRequest | WebSocketRequest }) => {
      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      
      // Check if the password is correct
      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }
      
      // Generate JWT token and return
      const token = jwt.sign({ username }, secretKey);
      return token;
    },
    logout: async () => {
      // Placeholder for logout logic
      return true;
    },
    createProject: async (_: any, { name }: { name: string }, { currentUser }: { currentUser: any }) => {
      // Access the authenticated user from context
      if (!currentUser) {
        throw new Error('Authentication required to create a project');
      }
      // Resolver logic to create a project
      return { name, createdBy: currentUser.username }; // Placeholder for actual implementation
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }: { req: HttpRequest | WebSocketRequest }) => {
    let currentUser;
    if ('headers' in req) { // HttpRequest
      const auth = req.headers.authorization;
      if (auth && auth.startsWith('Bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), secretKey) as { id: string };
        currentUser = await User.findById(decodedToken.id);
      }
    } else { // WebSocketRequest
      const token = req.token;
      if (token) {
        const decodedToken = jwt.verify(token, secretKey) as { id: string };
        currentUser = await User.findById(decodedToken.id);
      }
    }
    return { currentUser };
  },
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }: { req: HttpRequest | WebSocketRequest }) => {
      let currentUser;
      if ('headers' in req) { // HttpRequest
        const auth = req.headers.authorization;
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET) as { id: string };
          currentUser = await User.findById(decodedToken.id);
        }
      } else { // WebSocketRequest
        const token = req.token;
        if (token) {
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
          currentUser = await User.findById(decodedToken.id);
        }
      }
      return { currentUser };
    },
  });
  console.log(`Server ready at ${url}`);
}

startServer().catch(error => console.error('Error starting server:', error));


```