import express, { type Request, type Response, type NextFunction } from 'express';
import Message from './Message.js';
import type MessageDto from './MessageDto.js';

const app = express();
const PORT = 3000;

app.use(express.json());

class MessageService {
    private messages: Message[] = [];

    add(dto: MessageDto) {
        const message = Message.fromDto(dto);
        this.messages.push(message);
        return message;
    }

    getAllSorted() {
        return this.messages
            .slice()
            .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime());
    }

    findById(id: number) {
        return this.messages.find((m) => m.getId() === id) ?? null;
    }

    findIndexById(id: number) {
        return this.messages.findIndex((m) => m.getId() === id);
    }

    deleteByIndex(index: number) {
        this.messages.splice(index, 1);
    }
}

const store = new MessageService();

function parseIdParam(req: Request, res: Response, next: NextFunction) {
    const raw = req.params.id;
    const id = Number(raw);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid message ID' });
    }

    res.locals.id = id;
    next();
}

function loadMessage(_req: Request, res: Response, next: NextFunction) {
    const id: number = res.locals.id;
    const message = store.findById(id);

    if (!message) {
        return res.status(404).json({ error: 'Message not found' });
    }

    res.locals.message = message;
    res.locals.index = store.findIndexById(id);
    next();
}

app.get('/messages', (_req: Request, res: Response) => {
    res.json(store.getAllSorted());
});

app.get('/messages/:id', parseIdParam, loadMessage, (_req: Request, res: Response) => {
    res.json(res.locals.message);
});

app.post('/messages', (req: Request, res: Response) => {
    const dto = req.body as MessageDto;
    const newMessage = store.add(dto);
    res.status(201).json(newMessage);
});

app.delete('/messages/:id', parseIdParam, loadMessage, (_req: Request, res: Response) => {
    const index: number = res.locals.index;
    store.deleteByIndex(index);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
