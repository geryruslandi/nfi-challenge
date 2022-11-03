import { jsonResponseMessageOk } from "@src/utils/Helpers";
import { Request, Response } from "express";

class RegistrationController {

    public store(req: Request, res: Response) {
        return jsonResponseMessageOk(res, 'ok')
    }
}

export default RegistrationController
