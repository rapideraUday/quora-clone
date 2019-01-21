const jwt = require('jsonwebtoken');

import Utility from '../../controllers/_helper/utility';

class ValidateUser {

    /**
     * @function validateUser
     * @description middleware which checks is token is present in headers or not
     */
    static validateUser = (req, res, next) => {
        const authorizationHeaader = req.headers.authorization;
        console.log(authorizationHeaader);
        let result;

        if (authorizationHeaader) {
            const token = req.headers.authorization.split(' ')[1];
            const options = { expiresIn: '1d', issuer: 'quora-clone' };
            try {
                result = jwt.verify(token, process.env.JWT_SECRET, options);
                req.decoded = result;

                next();
            } catch (error) {
                throw new Error(error);
            }
        } else {
            result = Utility.generateResponse(401, "Authentication Error : Token required", false, null);
            res.status(401).send(result);
        }
    }
}

Object.seal(ValidateUser);
export = ValidateUser;