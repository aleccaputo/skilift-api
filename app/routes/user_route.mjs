import {hashPassword, validatePost} from "../services/user-service";
// this doesn't work with import yet...
//import * as HttpStatus from 'http-status-codes'
import {InvalidUserException} from '../exceptions/user-exceptions'
import UserModel from '../domain/models/UserModel';

export function userRoutes(app, db) {
    app.post('/users', async (req, res) => {
        try {
            validatePost(req.body);
            const passwordHash = await hashPassword(req.body.password);
            const user = new UserModel();
            user.username = req.body.username;
            user.password = passwordHash;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;

            const exists = await db.collection('users').find({'username': user.username}).limit(1).count() > 0;
            if(exists) {
                res.status(409).send({error: 'Conflict. User Exists'});
            }
            const {result} = await db.collection('users').insert(user);
                if (!result.ok) {
                    res.send({'error': 'An error has occurred'});
                } else {
                    res.status(200).send();
                }
                console.log(req.body);
        } catch (e) {
            if (e.constructor.name === 'InvalidUserException') {
                res.status(400).send({error: 'Bad Request'});
            } else {
                res.status(500).send({error: 'Server Error'});
            }
        }
    });

    app.get('/users/:userId', async (req, res) => {
        try {
            const {userId} = req.params.userId;
            if (!userId) {
                res.status(400).send({error: 'Bad Request. userId required'});
            }
        } catch (e) {
            res.status(500).send({error: 'Server Error'});
        }
    });
}