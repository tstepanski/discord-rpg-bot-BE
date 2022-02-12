import {Player} from "../entities";
import {Repository} from "../database";
import {DatabaseContextWrapper} from "./databaseContextWrapper";

export class PlayerService {
	public constructor(private readonly database: DatabaseContextWrapper) {
	}

	public async createOrGetPlayer(id: string): Promise<Player> {
		const repository = await this.getRepository();

		try {
			return repository.get(id);
		} catch {
			const player = <Player>{
				id: id
			};

			return await repository.add(player);
		}
	}

	private getRepository(): Promise<Repository<Player>> {
		return this.database.getRepository("players");
	}
}
