import AuthService from "@src/services/AuthService";
import UserTransformer from "@src/transformers/UserTransformer";
import { jsonResponse, jsonResponseMessageError, jsonResponseValidationError } from "@src/utils/Helpers";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator"

class LoginController {

    public store = [
        body('username')
            .notEmpty()
            .withMessage('username cant be empty')
            .isString()
            .isLength({min: 6})
            .withMessage('username minimal length is 6 character'),
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

            try {
                const user = await AuthService.login(req.body.username, req.body.password)

                const transformer = new UserTransformer(user)
                transformer.with(['privateData'])

                const tokenService = new AuthService(user)

                return jsonResponse(res, {
                    user: transformer.get(),
                    token: tokenService.generateToken()
                })
            } catch (e: any) {
                return jsonResponseMessageError(res, e, 4010, 401)
            }
        }

    ]
}

export default LoginController
