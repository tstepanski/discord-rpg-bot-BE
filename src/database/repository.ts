import {Indexed} from "./indexed";

export interface Repository<T extends Indexed> {
	get(id: string): Promise<T>;

	add(item: T): Promise<T>;

	delete(...ids: string[]): Promise<void>;
}
