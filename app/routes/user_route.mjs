import {hashPassword, validatePost} from "../services/user-service";
// this doesn't work with import yet...
//import * as HttpStatus from 'http-status-codes'
import {InvalidUserException} from '../exceptions/user-exceptions'
import User from '../domain/schemas/UserModel';
import {createToken, isAllowedAccess} from "../services/auth-service";

export function userRoutes(app) {
    app.post('/users', async (req, res) => {
        try {
            validatePost(req.body);

            const exists = await User.find({'username': req.body.username}).count() > 0;
            if(exists) {
                res.status(409).send({error: 'Conflict. User Exists'});
            }

            const passwordHash = await hashPassword(req.body.password);
            const user = new User({
                username: req.body.username,
                password: passwordHash,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            });

            const {result} = await User.insertOne(user);
                if (!result.ok) {
                    res.send({'error': 'An error has occurred'});
                } else {
                    const token = createToken(user);
                    res.status(200).send({token});
                }
                console.log(req.body);
        } catch (e) {
            console.log(e);
            if (e.constructor.name === 'InvalidUserException') {
                res.status(400).send({error: 'Bad Request'});
            } else {
                res.status(500).send({error: 'Server Error'});
            }
        }
    });

    app.get('/users/:username', async (req, res) => {
        const token = req.headers['x-access-token'];
        if(!token) {
            return res.status(403).send({error: "Token required"});
        }
        try{
            isAllowedAccess(token);
        }
        catch(e) {
            return res.status(401).send({error: "Unauthorized"});
        }

        try {
            const {username} = req.params;
            if (!username) {
                res.status(400).send({error: 'Bad Request. userId required'});
            }
            const user = await User.findByUsername(username);
            if(user) {
                res.status(200).send({firstName: user.firstName});
            }
        } catch (e) {
            res.status(500).send({error: 'Server Error'});
        }
    });
}