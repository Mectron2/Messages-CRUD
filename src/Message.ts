import type MessageDto from './MessageDto.js';
import ErrorMessage from './ErrorMessage.js';

export default class Message {
    private static lastId = 0;
    private readonly id: number;
    private userId: number;
    private text: string;
    private readonly createdAt: Date;

    constructor(userId: number, text: string) {
        this.id = ++Message.lastId;
        this.userId = userId;
        this.text = text;
        this.createdAt = new Date();
    }

    getId(): number {
        return this.id;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    setText(text: string): void {
        if (!text || text.trim() === '') {
            throw new ErrorMessage(400, 'Text cannot be empty');
        }
        this.text = text;
    }

    static fromDto(dto: MessageDto): Message {
        if (!dto.userId || !dto.text) {
            throw new ErrorMessage(400, 'Missing userId or text field');
        }
        return new Message(dto.userId, dto.text);
    }
}
