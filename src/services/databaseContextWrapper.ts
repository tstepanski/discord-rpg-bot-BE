import {DatabaseContext, Repository} from "../database";
import {Collection} from "../entities";

export class DatabaseContextWrapper {
	public constructor(private readonly databaseContext: DatabaseContext) {
	}

	public getRepository<T extends keyof Collection>(key: T): Promise<Repository<Collection[T]>> {
		return this.databaseContext.getRepository<Collection, typeof key>(key);
	}
}
