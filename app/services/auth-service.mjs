import jwt from 'jsonwebtoken';
import {auth} from "../../config/auth";

export function createToken(userResponse) {
    return jwt.sign({id: userResponse._id.toString()}, auth.secret, {expiresIn: 86400, subject: userResponse._doc.username})
}

export function isAllowedAccess(token) {
    return jwt.verify(token, auth.secret);
}

export function isAllowedAccessToUserData(token, username) {
    return jwt.verify(token, auth.secret, {subject: username});
}