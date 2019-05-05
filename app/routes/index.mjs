import {userRoutes} from "./user_route";
import {authRoutes} from "./auth_route";

export function routes(app) {
    userRoutes(app);
    authRoutes(app);
}