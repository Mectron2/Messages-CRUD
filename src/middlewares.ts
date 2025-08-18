import type { NextFunction, Request, Response } from 'express';
import ErrorMessage from './ErrorMessage.js';
import { messageService } from './MessageController.js';

export function parseIdParam(req: Request, res: Response, next: NextFunction) {
    const raw = req.params.id;
    const id = Number(raw);

    if (!Number.isInteger(id) || id <= 0) {
        return next(new ErrorMessage(400, `Invalid ID parameter: ${raw}`));
    }

    res.locals.id = id;
    next();
}

export function parseLimitAndStartQueryParams(req: Request, res: Response, next: NextFunction) {
    const limit = req.query.limit !== undefined ? Number(req.query.limit) : 10;
    const start = req.query.start !== undefined ? Number(req.query.start) : 0;

    if (isNaN(limit) || limit <= 0) {
        return next(new ErrorMessage(400, `Invalid limit parameter: ${req.query.limit}`));
    }

    if (isNaN(start) || start < 0) {
        return next(new ErrorMessage(400, `Invalid start parameter: ${req.query.start}`));
    }

    res.locals.start = start;
    res.locals.limit = limit;
    next();
}

export function loadMessage(_req: Request, res: Response, next: NextFunction) {
    const id: number = res.locals.id;
    const message = messageService.findById(id);

    if (!message) {
        return next(new ErrorMessage(404, `Message with ID ${id} not found`));
    }

    res.locals.message = message;
    res.locals.index = messageService.findIndexById(id);
    next();
}
