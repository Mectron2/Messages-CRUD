import type MessageDto from './MessageDto.js';

export default class Message {
    private static lastId = 0;
    private readonly id: number;
    private readonly userId: number;
    private readonly text: string;
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

    static fromDto(dto: MessageDto): Message {
        if (!dto.userId || !dto.text) {
            throw new Error('Missing userId or text field');
        }
        return new Message(dto.userId, dto.text);
    }
}
