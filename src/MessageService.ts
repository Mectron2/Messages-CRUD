import type MessageDto from './MessageDto.js';
import Message from './Message.js';

export default class MessageService {
    private messages: Message[] = [
        new Message(1, 'Hello World!'),
        new Message(2, 'From TypeScript!'),
    ];

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

    updateMessage(message: Message, dto: Partial<MessageDto>) {
        if (dto.userId !== undefined) message.setUserId(dto.userId);
        if (dto.text !== undefined) message.setText(dto.text);
        return message;
    }
}
