import bcrypt from 'bcrypt';
import User from '../domain/schemas/UserModel';
import {createToken} from "../services/auth-service";

export function authRoutes (app) {
    app.post('/login', async (req, res) => {
        const {username, password} = req.body;
        if(!username || !password) {
            return res.status(400).send({error: "Username and password are required"});
        }
        try {
            const user = await User.findByUsername(username);
            try {
                const result = await bcrypt.compare(password, user.password);
                if(!result) {
                    return res.status(400).send({error: "Username and password did not match"});
                }
                const token = createToken(user);
                return res.status(200).send({token});
            }
            catch(e) {
                return res.status(400).send({error: "Username and password did not match"});
            }
        }
        catch(e) {
            return res.status(404).send({error: "Unable to find user"});
        }
    });
}