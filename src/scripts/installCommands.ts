import { GraphQLError } from 'graphql';
import { ProjectModel } from '../models/Project.model.js';
import { ModuleType, FrontFrame, BackendEnv, Cms, Database, Project, Packages } from '../types.js';
import { packageMappings } from '../types/packageMappings.js';
// import { Packages } from '../types/packages.js';

// Function to generate the npm install commands
export const generateInstallCommands = async (projectId: string): Promise<Project> => {
	try {
		// Fetch project data from the database

		if (!projectId) {
			throw new GraphQLError('Invalid project ID', {
				extensions: {
					code: 'INVALID_INPUT',
					invalidArgs: projectId,
				},
			});
		}

		const project: Project = await ProjectModel.findById(projectId);

		const { frontend, backend, title } = project;
		const { framework, gqlClient, packages: frontPackages } = frontend;
		const { environment, moduleType, gqlServer, packages: backPackages, database, cms } = backend;

		console.log(backend.environment);

		const {
			GraphqlCodegenCli,
			GraphqlCodegenTypescript,
			GraphqlCodegenTypescriptResolvers,
			ApolloClient,
			ApolloServer,
			Bcryptjs,
			Bcryptts,
			Cors,
			Express,
			EmotionReact,
			EmotionStyled,
			Graphql,
			GraphqlTag,
			Jsonwebtoken,
			Mongoose,
			MuiMaterial,
			Nodemon,
			Pg,
			StyledComponents,
			Tsup,
			Tsx,
			TypesCors,
			TypesExpress,
			TypesJsonwebtoken,
			TypesNode,
			TypesNodemon,
			TypesPg,
			Typescript,
		} = Packages;

		const { Nextjs, Reactjs, Reactts, Nextts } = FrontFrame;

		const { Nodets, NodeExpressJs, NodeExpressTs } = BackendEnv;

		const { Commonjs, Module } = ModuleType;

		const { Mongodb, Postgres } = Database;

		const { KeystoneJs, Strapi } = Cms;

		const frontendCommands: string[] = [];
		const backendCommands: string[] = [];

		const camelCaseTitle = title.toLowerCase().replace(/\s+/g, '-');

		const frontendPackages = [...frontPackages];
		const backendPackages = [...backPackages];

		// Frontend framework specific commands
		switch (framework) {
			case Reactts:
				frontendCommands.push(
					`<li>npm create vite@latest ${camelCaseTitle} -- --template react-ts</li>`
				);
				frontendCommands.push(`<li>cd ${camelCaseTitle}</li><li>npm install</li>`);
				frontendPackages.push(Tsx, Tsup, Nodemon);
				break;
			case Nextjs:
				frontendCommands.push(`<li>npx create-next-app ${camelCaseTitle}</li>`);
				frontendCommands.push(`<li>cd ${camelCaseTitle}</li>`);
				break;
			case Nextts:
				frontendCommands.push(`<li>npx create-next-app ${camelCaseTitle}</li>`);
				frontendCommands.push(`<li>cd ${camelCaseTitle}</li>`);
				break;
			case Reactjs:
				frontendCommands.push(
					`<li>npm create vite@latest ${camelCaseTitle} -- --template react</li>`
				);
				frontendCommands.push(`<li>cd ${camelCaseTitle}</li><li>npm install</li>`);
				frontendPackages.push(Nodemon);
				break;
			default:
				break;
		}

		// Frontend data layer specific commands
		if (gqlClient || gqlServer) {
			frontendPackages.push(ApolloClient, Graphql, GraphqlTag);
			backendPackages.push(
				ApolloServer,
				Graphql,
				GraphqlTag,
				GraphqlCodegenCli,
				GraphqlCodegenTypescript,
				GraphqlCodegenTypescriptResolvers
			);
		}

		// if (gqlServer) {
		// 	backendPackages.push(
		// 		ApolloServer,
		// 		Graphql,
		// 		GraphqlTag,
		// 		GraphqlCodegenCli,
		// 		GraphqlCodegenTypescript,
		// 		GraphqlCodegenTypescriptResolvers
		// 	);
		// }

		// Backend setup commands
		backendCommands.push(`<li>mkdir ${camelCaseTitle}-backend</li>`);
		backendCommands.push(`<li>cd ${camelCaseTitle}-backend</li>`);
		backendCommands.push('<li>npm init -y</li>');

		if (environment === Nodets || environment === NodeExpressTs) {
			backendPackages.push(Typescript, TypesNode, Tsx, Tsup);
			for (const pkg of backendPackages) {
				switch (pkg as Packages) {
					case Jsonwebtoken:
						backendPackages.push(TypesJsonwebtoken);
						break;
					case Bcryptjs:
						backendPackages.push(Bcryptts);
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

		if (cms === KeystoneJs) {
			backendCommands.push(`<li>cd ${camelCaseTitle}-backend</li>`);
			backendCommands.push('<li>npm init keystone-app@latest</li>');
		} else if (cms === Strapi) {
			backendCommands.push(`<li>cd ${camelCaseTitle}-backend</li>`);
			backendCommands.push(`<li>npx create-strapi-app@latest ${camelCaseTitle}</li>`);
		}

		// Backend module type specific commands
		if (moduleType === Module) {
			backendCommands.push('<li>npm pkg set type="module"</li>');
		} else if (moduleType === Commonjs) {
			backendCommands.push('<li>npm pkg set type="commonjs"</li>');
		}

		// Database specific commands
		if (database === Mongodb) {
			backendPackages.push(Mongoose);
		} else if (database === Postgres) {
			backendPackages.push(Pg);

			if (environment === Nodets || environment === NodeExpressTs) {
				backendPackages.push(TypesPg);
			}
		}

		const frontendPackageNames = frontendPackages.map((pkg) => packageMappings[pkg]);
		const backendPackageNames = backendPackages.map((pkg) => packageMappings[pkg]);

		// Construct npm install commands
		const frontendInstalls = `<li>npm install ${frontendPackageNames.join(' ')}</li><li>cd ..</li>`;

		const backendInstalls = `<li>npm install ${backendPackageNames.join(' ')}</li><li>cd ..</li>`;

		// Combine all commands
		const frontendInstallCommands = frontendCommands.concat(frontendInstalls).join('\n');

		const backendInstallCommands = backendCommands.concat(backendInstalls).join('\n');

		// add frontend packages to the Mongo document
		const uniqueFrontend = [...new Set([...project.frontend.packages, ...frontendPackages])];

		const uniqueBackend = [...new Set([...project.backend.packages, ...backendPackages])];

		if (uniqueBackend.includes(Bcryptts)) {
			// If Bcryptts is present in backPackages
			const index = uniqueBackend.indexOf(Bcryptjs);
			if (index !== -1) {
				// If Bcryptjs is present in backPackages, remove it
				uniqueBackend.splice(index, 1);
			}
		}

		if (environment === null || database === null || moduleType === null) {
			project.installScripts.backend = '<li>There is no backend setup for this project</li>';
		} else {
			project.installScripts.backend = backendInstallCommands;
		}

		if (framework === null) {
			project.installScripts.frontend = '<li>There is no frontend setup for this project</li>';
		} else {
			project.installScripts.frontend = frontendInstallCommands;
		}

		project.frontend.packages = uniqueFrontend;
		project.backend.packages = uniqueBackend;

		return project;
	} catch (error) {
		console.error('Error generating npm install commands:', error.message);
		throw error; // Re-throw the error to be handled by the caller
	}
};
