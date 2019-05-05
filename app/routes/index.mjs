import {userRoutes} from "./user_route";
import {authRoutes} from "./auth_route";
import {postRoutes} from "./post_route";

export function routes(app) {
    userRoutes(app);
    authRoutes(app);
    postRoutes(app);
}