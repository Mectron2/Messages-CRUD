import express, { type Request, type Response } from 'express';
import Message from './Message.js';
import type MessageDto from './MessageDto.js';

const app = express();
const PORT = 3000;

let messages: Message[] = [];

app.use(express.json());

app.post('/messages', (req: Request, res: Response) => {
    const messageDto = req.body as MessageDto;

    const newMessage = Message.fromDto(messageDto);
    messages.push(newMessage);

    res.status(201).json(newMessage);
});

app.get('/messages', (_req: Request, res: Response) => {
    const sortedMessages = messages
        .slice()
        .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime());

    res.json(sortedMessages);
});

app.delete('/messages/:id', (req: Request, res: Response) => {
    const idParam = req.params.id;
    if (!idParam || isNaN(parseInt(idParam, 10))) {
        return res.status(400).json({ error: 'Invalid message ID' });
    }

    const id = parseInt(idParam, 10);
    const index = messages.findIndex((message) => message.getId() === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Message not found' });
    }

    messages.splice(index, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
