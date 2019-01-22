const jwt = require('jsonwebtoken');

import Utility from '../../controllers/_helper/utility';
import UserBusiness = require('../../app/business/UserBusiness');

class ValidateUser {

    /**
     * @function auth
     * @description middleware which checks is token is present in headers or not
     */
    static auth = (req, res, next) => {
        const authorizationHeaader = req.headers.authorization;

        if (authorizationHeaader) {
            const token = req.headers.authorization.split(' ')[1];
            const options = { expiresIn: '1d', issuer: 'quora-clone' };
            try {
                jwt.verify(token, process.env.JWT_SECRET, options, (error, result) => {
                    if (error) {
                        return res.send(Utility.generateResponse(401, error, false, null));
                    }
                    let userBusiness = new UserBusiness();
                    userBusiness.findByToken(token, (error, result) => {
                        if (error) {
                            return res.send(Utility.generateResponse(401, error, false, null));
                        }
                        if (result) {
                            req.user = result;
                            next();
                        } else {
                            return res.send(Utility.generateResponse(401, "Token expired", false, null));
                        }
                    })
                });

            } catch (error) {
                throw new Error(error);
            }
        } else {
            res.status(401).send(Utility.generateResponse(401, "Authentication Error : Token required", false, null));
        }
    }
}

Object.seal(ValidateUser);
export = ValidateUser;