import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import User from "@src/models/User";
import { jsonResponse, jsonResponseValidationError } from "@src/utils/Helpers";
import RegistrationService from "@src/services/RegistrationService";
import UserTransformer from "@src/transformers/UserTransformer";
import AuthService from "@src/services/AuthService";

class RegistrationController {

    public store = [
        body('username')
            .notEmpty()
            .withMessage('username cant be empty')
            .isString()
            .isLength({min: 6})
            .withMessage('username minimal length is 6 character')
            .custom(async (value) => {
                const existUser = await User.findOne({
                    where: {
                        username: value
                    }
                })

                if(existUser) throw "Username cant be used"
            }),
        body('password')
            .notEmpty()
            .withMessage('password cant be empty')
            .isString()
            .isLength({min: 8})
            .withMessage('password minimal length is 8 character'),
        async function(req: Request, res: Response) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return jsonResponseValidationError(res, errors);
            }

            const service = new RegistrationService()
            const user = await service.createUser(req.body.username, req.body.password)
            await user.reload({include: ['privateData']})

            const transformer = new UserTransformer(user)
            transformer.with(['privateData'])

            const token = new AuthService(user)

            jsonResponse(res, {
                user: transformer.get(),
                token: token.generateToken()
            })
        }
    ]
}

export default RegistrationController
