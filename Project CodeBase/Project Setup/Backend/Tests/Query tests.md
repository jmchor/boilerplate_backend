Example:

```ts

import { createTest, TestInterface } from 'vitest';
import { ApolloServer } from 'apollo-server';
import { gql } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers'; // Import your resolvers here
import jwt from 'jsonwebtoken';

// Define the test interface
interface Context {
  apolloServer: ApolloServer;
}

const test: TestInterface<Context> = createTest<Context>();

// Define your GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define your test case
test('Query hello', async ({ before, after, test }) => {
  const apolloServer = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
  });

  await before(() => apolloServer.start());
  await after(() => apolloServer.stop());

  const { query } = await test(before, async ({}) => {
    const response = await apolloServer.executeOperation({
      query: gql`
        query {
          hello
        }
      `,
    });
    return response.data?.hello;
  });

  query('should return "Hello World"', async ({ value }) => {
    expect(value).toBe('Hello World');
  });
});

// Run the tests
test.run();


```