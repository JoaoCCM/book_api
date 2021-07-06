import { Request } from 'express';

export class IAuthMiddleware extends Request {
    user: {
        payload: {
            id: number,
        }
    }
}

export class IAuthUserMiddleware {
    user: {
        payload: {
            id: number,
        }
    }
}