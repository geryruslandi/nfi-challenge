import {Request, Response} from 'express';

export function jsonResponse(response : Response, responseData: any, internalCode = 1000, status = 200) {
    return response.status(status).json( {
        code: internalCode,
        response : responseData
    });
}

export function jsonResponseMessageOk(response: Response, message: string) {
    return jsonResponse(response, {
        message
    })
}

export function jsonResponseMessageError(response: Response, message: string, internalCode: number = 5000, httpCode: number = 500) {
    return jsonResponse(response, [
        {
            msg: message,
            param: null,
            location: null
        }
    ], internalCode, httpCode)
}

export function jsonResponseUnauthorized(response: Response) {
    return jsonResponseMessageError(response, 'Not authenticated, please re-login', 4010, 401)
}

export function redirectWithFlashData(req: Request, res: Response, redirectTo: string, flashData: any)
{
    // @ts-ignore
    req.session.setFlashData(flashData)
    return res.redirect(redirectTo);
}
