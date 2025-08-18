import type MessageDto from './MessageDto.js';
import Message from './Message.js';
import type UpdateMessageDto from './UpdateMessageDto.js';

export default class MessageService {
    private messages: Message[] = [
        new Message(1, 'Hello World!'),
        new Message(2, 'Let’s build something awesome!'),
        new Message(3, 'How are you?'),
        new Message(1, 'This is a test message.'),
        new Message(2, 'Express is cool!'),
        new Message(3, 'TypeScript makes life easier.'),
        new Message(1, 'Another message from user 1.'),
        new Message(2, 'Backend and frontend connected.'),
        new Message(3, 'Npm is cool.'),
        new Message(1, 'Learning Node.js is fun.'),
        new Message(2, 'Middleware is powerful.'),
        new Message(3, 'Sorting and slicing arrays.'),
        new Message(1, 'Hello again!'),
        new Message(2, 'Pagination works fine.'),
        new Message(3, 'Custom errors are neat.'),
        new Message(1, 'CORS fixed successfully.'),
        new Message(2, 'Async/await is convenient.'),
        new Message(3, 'Singleton services are useful.'),
        new Message(1, 'Message service example.'),
        new Message(2, 'Frontend fetch works.'),
        new Message(3, 'Error handling middleware.'),
        new Message(1, 'Parsing middleware added.'),
        new Message(2, 'Query parameters validated.'),
        new Message(3, 'Default values set.'),
        new Message(1, 'Final message from user 1.'),
        new Message(2, 'Final message from user 2.'),
        new Message(3, 'Final message from user 3.'),
        new Message(1, 'Extra message to test pagination.'),
    ];

    add(dto: MessageDto): Message {
        const message = Message.fromDto(dto);
        this.messages.push(message);
        return message;
    }

    getSorted(limit: number = 10, start: number = 0): Message[] {
        return this.messages
            .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime())
            .slice(start, start + limit);
    }

    findById(id: number): Message | null {
        return this.messages.find((m) => m.getId() === id) ?? null;
    }

    findIndexById(id: number): number {
        return this.messages.findIndex((m) => m.getId() === id);
    }

    deleteByIndex(index: number): void {
        this.messages.splice(index, 1);
    }

    updateMessage(message: Message, dto: UpdateMessageDto): Message {
        message.setText(dto.text);
        return message;
    }
}
