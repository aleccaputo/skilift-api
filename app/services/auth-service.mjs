import jwt from 'jsonwebtoken';
import {auth} from "../../config/auth";

export function createToken(userResponse) {
    return jwt.sign({id: userResponse._id}, auth.secret, {expiresIn: 86400})
}