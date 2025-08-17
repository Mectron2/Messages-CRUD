import express, { type Request, type Response, type NextFunction } from 'express';
import type MessageDto from './MessageDto.js';
import ErrorMessage from './ErrorMessage.js';
import MessageService from './MessageService.js';
import cors from 'cors';
import { parseIdParam, loadMessage, parseLimitAndStartQueryParams } from './middlewares.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:63342',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    })
);

export const messageService = new MessageService();

app.get('/messages', parseLimitAndStartQueryParams, (_req: Request, res: Response) => {
    res.json(messageService.getSorted(res.locals.limit, res.locals.start));
});

app.get('/messages/:id', parseIdParam, loadMessage, (_req: Request, res: Response) => {
    res.json(res.locals.message);
});

app.post('/messages', (req: Request, res: Response) => {
    const dto = req.body as MessageDto;
    const newMessage = messageService.add(dto);
    res.status(201).json(newMessage);
});

app.delete('/messages/:id', parseIdParam, loadMessage, (_req: Request, res: Response) => {
    const index: number = res.locals.index;
    messageService.deleteByIndex(index);
    res.status(204).send();
});

app.patch('/messages/:id', parseIdParam, loadMessage, (req: Request, res: Response) => {
    const dto = req.body as Partial<MessageDto>;
    const updatedMessage = messageService.updateMessage(res.locals.message, dto);
    res.json(updatedMessage);
});

app.use((err: ErrorMessage, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.getStatusCode() || 500).json({
        error: err.getErrorMessage() || 'Internal Server Error',
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
