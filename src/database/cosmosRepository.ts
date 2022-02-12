import {Repository} from "./repository";
import {Container, Item, ItemDefinition, ItemResponse} from "@azure/cosmos";

export class CosmosRepository<T extends ItemDefinition> implements Repository<T> {
	public constructor(private readonly container: Container) {
	}

	public async add(item: T): Promise<T> {
		const response = await this.container.items.create(item);

		return this.getResource(response, "create");
	}

	public async delete(...ids: string[]): Promise<void> {
		const getItem = this.getItem;
		const deletionTasks = ids.map(id => getItem(id).delete());

		await Promise.all(deletionTasks);
	}

	public async get(id: string): Promise<T> {
		const response = await this.getItem(id).read<T>();

		return this.getResource(response, "read");
	}

	private getItem(id: string): Item {
		return this.container.item(id);
	}

	private getResource(response: ItemResponse<T>, action: string): T {
		const result = response.resource;

		if (result === undefined) {
			throw new Error(`Failed to ${action} entity: ${response.statusCode}`);
		}

		return result;
	}
}
