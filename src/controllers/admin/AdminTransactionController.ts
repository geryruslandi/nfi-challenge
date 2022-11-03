import User from "@src/models/User"
import UsersPrivateData from "@src/models/UsersPrivateData"
import UsersPrivateDataTransformer from "@src/transformers/UsersPrivateDataTransformer"
import { jsonResponse, jsonResponseMessageError, jsonResponseValidationError } from "@src/utils/Helpers"
import { Request, Response } from "express"
import { body, validationResult } from "express-validator"

type AuthenticatedRequest = Request & {user: User}

class AdminTransactionController {

    public deposit = [
        body('amount')
            .isNumeric()
            .withMessage('amount should be numeric')
            .isFloat({min: 1})
            .withMessage('amount should be greater than zero'),
        body('user_id')
            .notEmpty()
            .withMessage('user id cant be empty')
            .custom(async (value) => {
                const existUser = await User.findByPk(value)

                if(!existUser) throw "user not found"
            }),
        async function(req: AuthenticatedRequest, res: Response) {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return jsonResponseValidationError(res, errors);
            }

            const user = await User.findByPk(req.body.user_id)
            const privateData = await user?.deposit(req.body.amount) as UsersPrivateData

            const transformer = new UsersPrivateDataTransformer(privateData)

            return jsonResponse(res, {
                private_data: transformer.get()
            })
        }
    ]

    public withdraw = [
        body('amount')
            .isNumeric()
            .withMessage('amount should be numeric')
            .isFloat({min: 1})
            .withMessage('amount should be greater than zero'),
        body('user_id')
            .notEmpty()
            .withMessage('user id cant be empty')
            .custom(async (value) => {
                const existUser = await User.findByPk(value)

                if(!existUser) throw "user not found"
            }),
        async function(req: AuthenticatedRequest, res: Response) {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return jsonResponseValidationError(res, errors);
            }

            try {
                const user = await User.findByPk(req.body.user_id)
                const privateData = await user?.withdraw(req.body.amount) as UsersPrivateData

                const transformer = new UsersPrivateDataTransformer(privateData)

                return jsonResponse(res, {
                    private_data: transformer.get()
                })
            } catch(e: any) {
                return jsonResponseMessageError(res, e, 4220, 422)
            }
        }
    ]

}

export default AdminTransactionController
