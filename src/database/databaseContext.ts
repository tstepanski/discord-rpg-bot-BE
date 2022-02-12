import {Repository} from "./repository";

export interface DatabaseContext {
	connect(): Promise<void>;

	getRepository<TCollection, T extends string & keyof TCollection>(key: T): Promise<Repository<TCollection[T]>>;
}
