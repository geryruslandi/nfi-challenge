import User from "@src/models/User"
import UsersPrivateDataTransformer from "@src/transformers/UsersPrivateDataTransformer"
import { jsonResponse, jsonResponseMessageError, jsonResponseValidationError } from "@src/utils/Helpers"
import { Request, Response } from "express"
import { body, validationResult } from "express-validator"

type AuthenticatedRequest = Request & {user: User}

class TransactionController {

    public deposit = [
        body('amount')
            .isNumeric()
            .withMessage('amount should be numeric')
            .isInt({min: 1})
            .withMessage('amount should be greater than zero'),
        async function(req: AuthenticatedRequest, res: Response) {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return jsonResponseValidationError(res, errors);
            }

            const privateData = await req.user.deposit(req.body.amount)

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
            .isInt({min: 1})
            .withMessage('amount should be greater than zero'),
        async function(req: AuthenticatedRequest, res: Response) {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return jsonResponseValidationError(res, errors);
            }

            try {
                const privateData = await req.user.withdraw(req.body.amount)

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

export default TransactionController
