import {PlayerService} from "./services";
import {DatabaseContextWrapper} from "./services/databaseContextWrapper";
import {CosmosDatabaseContext} from "./database";

export * from "./database";
export * from "./entities";
export * from "./services";

// TODO: Remove, left in to demonstrate build
new PlayerService(new DatabaseContextWrapper(new CosmosDatabaseContext("", ""))).createOrGetPlayer("d").then(() => {
});
