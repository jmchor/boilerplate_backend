// packageMappings.ts

import { Packages } from '../types.js'; // Adjust the import path as needed

export const packageMappings: Record<Packages, string> = {
	[Packages.GraphqlCodegenCli]: '@graphql-codegen/cli',
	[Packages.GraphqlCodegenTypescript]: '@graphql-codegen/typescript',
	[Packages.GraphqlCodegenTypescriptResolvers]: '@graphql-codegen/typescript-resolvers',
	[Packages.ApolloClient]: '@apollo/client',
	[Packages.ApolloServer]: '@apollo/server',
	[Packages.Bcryptjs]: 'bcryptjs',
	[Packages.Bcryptts]: 'bcrypt-ts',
	[Packages.Cors]: 'cors',
	[Packages.Dotenv]: 'dotenv',
	[Packages.Express]: 'express',
	[Packages.Graphql]: 'graphql',
	[Packages.GraphqlTag]: 'graphql-tag',
	[Packages.Jsonwebtoken]: 'jsonwebtoken',
	[Packages.Mongoose]: 'mongoose',
	[Packages.Nodemon]: 'nodemon',
	[Packages.Pg]: 'pg',
	[Packages.Tsup]: 'tsup',
	[Packages.Tsx]: 'tsx',
	[Packages.TypesBcryptjs]: '@types/bcryptjs',
	[Packages.TypesCors]: '@types/cors',
	[Packages.TypesExpress]: '@types/express',
	[Packages.TypesJsonwebtoken]: '@types/jsonwebtoken',
	[Packages.TypesNode]: '@types/node',
	[Packages.TypesNodemon]: '@types/nodemon',
	[Packages.TypesPg]: '@types/pg',
	[Packages.Typescript]: 'typescript',
};

// create package enums with codegen and then map them in installCommands.ts
