import Project, { ProjectDocument } from '../models/Project';
import { Packages } from '../types/packages.js';

// Function to generate the npm install commands
export const generateInstallCommands = async (projectId: string): Promise<ProjectDocument> => {
	try {
		// Fetch project data from the database
		const project: ProjectDocument = await Project.findById(projectId);
		if (!project) {
			throw new Error(`Project with ID ${projectId} not found`);
		}

		const { frontend, backend, title } = project;
		const {
			framework: frontendFramework,
			dataLayer: frontendDataLayer,
			packages: frontendPackages,
		} = frontend;
		const {
			framework: backendFramework,
			moduleType: backendModuleType,
			dataLayer: backendDataLayer,
			packages: backendPackages,
			database,
		} = backend;

		const {
			TSX,
			GRAPHQL_CODEGEN_CLI,
			GRAPHQL_CODEGEN_TYPESCRIPT,
			GRAPHQL_CODEGEN_TYPESCRIPT_RESOLVERS,
			NODEMON,
			TSUP,
			APOLLO_CLIENT,
			GRAPHQL,
			TYPESCRIPT,
			TYPES_NODE,
			MONGOOSE,
			PG,
			APOLLO_SERVER,
			JWT_TYPE,
			BCRYPT_TYPE,
			CORS_TYPE,
			NODEMON_TYPE,
		} = Packages;

		const frontendCommands: string[] = [];
		const backendCommands: string[] = [];

		const kebabCaseTitle = title.toLowerCase().replace(/\s+/g, '-');

		// Frontend framework specific commands
		if (frontendFramework.includes('react-ts')) {
			frontendCommands.push(`npm create vite@latest ${kebabCaseTitle} -- --template react-ts`);
			frontendCommands.push(`cd ${kebabCaseTitle}`);
			frontendPackages.push(TSX, TSUP, NODEMON);
		} else if (frontendFramework.includes('next-js')) {
			frontendCommands.push(`npx create-next-app ${kebabCaseTitle}`);
			frontendCommands.push(`cd ${kebabCaseTitle}`);
		} else if (frontendFramework.includes('react-js')) {
			frontendCommands.push(`npm create vite@latest ${kebabCaseTitle} -- --template react`);
			frontendCommands.push(`cd ${kebabCaseTitle}`);
			frontendPackages.push(NODEMON);
		}

		// Frontend data layer specific commands
		if (frontendDataLayer.includes('graphql-client')) {
			frontendPackages.push(APOLLO_CLIENT, GRAPHQL);
		}

		// Backend framework specific commands
		if (backendFramework.includes('node-ts')) {
			backendCommands.push(`mkdir ${kebabCaseTitle}-backend`);
			backendCommands.push(`cd ${kebabCaseTitle}-backend`);
			backendCommands.push('npm init -y');
			backendPackages.push(TYPESCRIPT, TYPES_NODE, TSX, TSUP);
			for (const pkg of backendPackages) {
				switch (pkg) {
					case Packages.JWT:
						backendPackages.push(JWT_TYPE);
						break;
					case Packages.BCRYPTJS:
						backendPackages.push(BCRYPT_TYPE);
						break;
					case Packages.CORS:
						backendPackages.push(CORS_TYPE);
						break;
					case Packages.NODEMON:
						backendPackages.push(NODEMON_TYPE);
						break;
					default:
						break;
				}
			}
		}

		// Backend data layer specific commands
		if (backendDataLayer.includes('graphql-server')) {
			backendPackages.push(
				APOLLO_SERVER,
				GRAPHQL,
				GRAPHQL_CODEGEN_CLI,
				GRAPHQL_CODEGEN_TYPESCRIPT,
				GRAPHQL_CODEGEN_TYPESCRIPT_RESOLVERS
			);
		}

		// Backend module type specific commands
		if (backendModuleType.includes('module')) {
			backendCommands.push('npm pkg set type="module"');
		} else if (backendModuleType.includes('commonjs')) {
			backendCommands.push(' npm pkg set type="commonjs"');
		}

		// Database specific commands
		if (database.includes('mongodb')) {
			backendCommands.push(MONGOOSE);
		} else if (database.includes('postgres')) {
			backendCommands.push(PG);
		}
		// Add more database specific commands as needed

		// Construct npm install commands
		const frontendInstalls = `npm install ${frontendPackages.join(' ')}`;

		const backendInstalls = `npm install ${backendPackages.join(' ')}`;

		// Combine all commands
		const frontendInstallCommands = frontendCommands.concat(frontendInstalls).join('\n');

		const backendInstallCommands = backendCommands.concat(backendInstalls).join('\n');

		project.installScripts.frontend = frontendInstallCommands;
		project.installScripts.backend = backendInstallCommands;
		await project.save();
		return project;
	} catch (error) {
		console.error('Error generating npm install commands:', error.message);
		throw error; // Re-throw the error to be handled by the caller
	}
};
