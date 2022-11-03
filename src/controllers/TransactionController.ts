import User from "@src/models/User"
import TransactionService from "@src/services/TransactionService"
import UsersPrivateDataTransformer from "@src/transformers/UsersPrivateDataTransformer"
import { jsonResponse, jsonResponseValidationError } from "@src/utils/Helpers"
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

            const service = new TransactionService(req.user)
            const privateData = await service.deposit(req.body.amount)

            const transformer = new UsersPrivateDataTransformer(privateData)

            return jsonResponse(res, {
                private_data: transformer.get()
            })
        }
    ]

}

export default TransactionController
