import {ContainerRequest, CosmosClient, CosmosClientOptions, Database, DatabaseRequest} from "@azure/cosmos";
import {DatabaseContext} from "./databaseContext";
import {Repository} from "./repository";
import {CosmosRepository} from "./cosmosRepository";

export class CosmosDatabaseContext implements DatabaseContext {
	private readonly client: CosmosClient;
	private readonly repositoryInstances: Record<string, object>;
	private database: Database | null;

	public constructor(endpoint: string, key: string) {
		const options = <CosmosClientOptions>{
			endpoint: endpoint,
			key: key
		};

		this.client = new CosmosClient(options);
		this.repositoryInstances = {};
		this.database = null;
	}

	public async connect(): Promise<void> {
		if (this.database === null) {
			await this.internalConnect();
		}
	}

	public async getRepository<TCollection, T extends string & keyof TCollection>(key: T): Promise<Repository<TCollection[T]>> {
		if (this.repositoryInstances.hasOwnProperty(key)) {
			return this.repositoryInstances[key] as Repository<TCollection[T]>;
		}

		const request = <ContainerRequest>{
			id: key
		};

		const database = this.database ?? await this.internalConnect();
		const container = await database.containers.createIfNotExists(request);
		const instance = new CosmosRepository<TCollection[T]>(container.container);

		this.repositoryInstances[key] = instance;

		return instance;
	}

	private async internalConnect(): Promise<Database> {
		const request = <DatabaseRequest>{
			id: "game"
		};

		const response = await this.client.databases.createIfNotExists(request);

		return this.database = response.database;
	}
}
