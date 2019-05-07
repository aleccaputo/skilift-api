import {validate} from "../services/post-service";
import {isAllowedAccessToUserData, isAllowedAccess} from "../services/auth-service";
import Post from '../domain/schemas/PostModel';

export function postRoutes(app) {
    app.post('/posts', async (req, res) => {
        const token = req.headers['x-access-token'];
        if(!token) {
            return res.status(403).send();
        }
        const {body} = req;
        try {
            isAllowedAccessToUserData(token);
        } catch(e) {
            return res.status(401).send();
        }
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

    app.get('/posts', async(req, res) => {
        const token = req.headers['x-access-token'];
        if(!token) {
            return res.status(403).send();
        }
        try {
            isAllowedAccess(token);
        } catch(e) {
            return res.status(401).send();
        }

        try {
            const posts = await Post.find({}, null, {take: 10, skip: 0}).sort({createdAt: 'desc'}).lean();
            return res.status(200).send({posts});
        } catch(e) {
            return res.status(500).send({error: 'unable to get posts'});
        }
    });

    app.get('/posts/username/:username', async(req, res) => {
        // todo
        return res.status(404).send({error: "Method Not Implemented"});
    });

    app.get('/posts/id/:postId', async(req, res) => {
        // todo
        return res.status(404).send({error: "Method Not Implemented"});
    });

    app.put('/posts', async(req, res) => {
       // todo
        return res.status(404).send({error: "Method Not Implemented"});
    });

    app.delete('/posts', async(req, res) => {
        // todo
        return res.status(404).send({error: "Method Not Implemented"});
    });

}