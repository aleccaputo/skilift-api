import {validate} from "../services/post-service";
import {isAllowedAccess} from "../services/auth-service";
import Post from '../domain/schemas/PostModel';

export function postRoutes(app) {
    app.post('/posts', async (req, res) => {
        const token = req.headers['x-access-token'];
        if(!token) {
            return res.status(403).send();
        }
        try {
            isAllowedAccess(token);
        } catch(e) {
            return res.status(401).send();
        }
        const {body} = req;
        const isValid = validate(body);
        if(!isValid) {
            return res.status(400).send();
        }
        const post = new Post({
            username: body.username,
            firstName: body.firstName,
            lastName: body.lastName,
            destination: body.destination,
            body: body.body,
            seatsLeft: body.seatsLeft
        });
        try {
            const result = await post.save();
            if (result.errors) {
                return res.status(400).send({error: "something went wrong. Please try again"});
            }
            return res.status(200).send();
        }
        catch(e) {
            return res.status(500).send({error: "server error"});
        }
    });
}