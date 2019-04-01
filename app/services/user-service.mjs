import bcrypt from 'bcrypt';
import {InvalidUserException} from '../exceptions/user-exceptions';

/**
 * hashes password
 * @param {string} plaintext
 * @returns {Promise<*>}
 */
export async function hashPassword(plaintext) {
    return bcrypt.hash(plaintext, 10);
}

/**
 * validates user post
 * @param req
 */
export function validatePost(req) {
    if (!req.username || !req.password) {
        throw new InvalidUserException('username and password are required');
    }
}