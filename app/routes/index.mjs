import {userRoutes} from "./user_route";

export function routes(app, db) {
    userRoutes(app, db);
}