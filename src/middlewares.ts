import type { NextFunction, Request, Response } from "express";
import ErrorMessage from "./ErrorMessage.js";
import { messageService } from "./index.js";

export function parseIdParam(req: Request, res: Response, next: NextFunction) {
    const raw = req.params.id;
    const id = Number(raw);

    if (!Number.isInteger(id) || id <= 0) {
        return next(new ErrorMessage(400, `Invalid ID parameter: ${raw}`));
    }

    res.locals.id = id;
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