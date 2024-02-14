import ProjectModel, { ProjectDocument } from '../models/Project.js';

import { ModuleType, FrontFrame, BackendEnv, Cms, Database, Packages } from '../types.js';

// Function to generate the npm install commands
export const generateInstallCommands = async (projectId: string): Promise<ProjectDocument> => {
	try {
		// Fetch project data from the database

		const project = await ProjectModel.findById(projectId);

		const { frontend, backend, title } = project;
		const { framework, gqlClient, packages: frontPackages } = frontend;
		const { environment, moduleType, gqlServer, packages: backPackages, database, cms } = backend;

		const {
			GraphqlCodegenCli,
			GraphqlCodegenTypescript,
			GraphqlCodegenTypescriptResolvers,
			ApolloClient,
			ApolloServer,
			Bcryptjs,
			Cors,
			Express,
			Graphql,
			GraphqlTag,
			Jsonwebtoken,
			Mongoose,
			Nodemon,
			Pg,
			Tsup,
			Tsx,
			TypesBcryptjs,
			TypesCors,
			TypesExpress,
			TypesJsonwebtoken,
			TypesNode,
			TypesNodemon,
			TypesPg,
			Typescript,
		} = Packages;

		const { Nextjs, Reactjs, Reactts } = FrontFrame;

		const { Nodets, NodeExpressJs, NodeExpressTs } = BackendEnv;

		const { Commonjs, Module } = ModuleType;

		const { Mongodb, Postgres } = Database;

		const { KeystoneJs, Strapi } = Cms;

		const frontendCommands: string[] = [];
		const backendCommands: string[] = [];

		const kebabCaseTitle = title.toLowerCase().replace(/\s+/g, '-');

		const frontendPackages = [...frontPackages];
		const backendPackages = [...backPackages];

		// Frontend framework specific commands
		if (framework === Reactts) {
			frontendCommands.push(`npm create vite@latest ${kebabCaseTitle} -- --template react-ts`);
			frontendCommands.push(`cd ${kebabCaseTitle}`);
			frontendPackages.push(Tsx, Tsup, Nodemon);
		} else if (framework === Nextjs) {
			frontendCommands.push(`npx create-next-app ${kebabCaseTitle}`);
			frontendCommands.push(`cd ${kebabCaseTitle}`);
		} else if (framework === Reactjs) {
			frontendCommands.push(`npm create vite@latest ${kebabCaseTitle} -- --template react`);
			frontendCommands.push(`cd ${kebabCaseTitle}`);
			frontendPackages.push(Nodemon);
		}

		// Frontend data layer specific commands
		if (gqlClient) {
			frontendPackages.push(ApolloClient, Graphql, GraphqlTag);
		}

		// Backend setup commands
		backendCommands.push(`mkdir ${kebabCaseTitle}-backend`);
		backendCommands.push(`cd ${kebabCaseTitle}-backend`);
		backendCommands.push('npm init -y');

		if (environment === Nodets || environment === NodeExpressTs) {
			backendPackages.push(Typescript, TypesNode, Tsx, Tsup);
			for (const pkg of backendPackages) {
				switch (pkg as Packages) {
					case Jsonwebtoken:
						backendPackages.push(TypesJsonwebtoken);
						break;
					case Bcryptjs:
						backendPackages.push(TypesBcryptjs);
						break;
					case Cors:
						backendPackages.push(TypesCors);
						break;
					case Nodemon:
						backendPackages.push(TypesNodemon);
						break;
					default:
						break;
				}
			}
		}
		if (environment === NodeExpressTs) {
			backendPackages.push(Express, TypesExpress);
		}

		if (environment === NodeExpressJs) {
			backendPackages.push(Express);
		}

		// Backend data layer specific commands
		if (gqlServer) {
			backendPackages.push(
				ApolloServer,
				Graphql,
				GraphqlTag,
				GraphqlCodegenCli,
				GraphqlCodegenTypescript,
				GraphqlCodegenTypescriptResolvers
			);
		}

		if (cms === KeystoneJs) {
			backendCommands.push(`cd ${kebabCaseTitle}-backend`);
			backendCommands.push('npm init keystone-app@latest');
		} else if (cms === Strapi) {
			backendCommands.push(`cd ${kebabCaseTitle}-backend`);
			backendCommands.push(`npx create-strapi-app@latest ${kebabCaseTitle}`);
		}

		// Backend module type specific commands
		if (moduleType === Module) {
			backendCommands.push('npm pkg set type="module"');
		} else if (moduleType === Commonjs) {
			backendCommands.push('npm pkg set type="commonjs"');
		}

		// Database specific commands
		if (database === Mongodb) {
			backendCommands.push(Mongoose);
		} else if (database === Postgres) {
			backendCommands.push(Pg);

			if (environment === Nodets || environment === NodeExpressTs) {
				backendPackages.push(TypesPg);
			}
		}
		// Add more database specific commands as needed

		// Construct npm install commands
		const frontendInstalls = `npm install ${frontendPackages.join(' ')}`;

		const backendInstalls = `npm install ${backendPackages.join(' ')}`;

		// Combine all commands
		const frontendInstallCommands = frontendCommands.concat(frontendInstalls).join('\n');

		const backendInstallCommands = backendCommands.concat(backendInstalls).join('\n');

		// add frontend packages to the Mongo document
		const uniqueFrontend = [...new Set([...project.frontend.packages, ...frontendPackages])];

		const uniqueBackend = [...new Set([...project.backend.packages, ...backendPackages])];

		project.installScripts.frontend = frontendInstallCommands;
		project.installScripts.backend = backendInstallCommands;
		project.frontend.packages = uniqueFrontend;
		project.backend.packages = uniqueBackend;

		return project;
	} catch (error) {
		console.error('Error generating npm install commands:', error.message);
		throw error; // Re-throw the error to be handled by the caller
	}
};