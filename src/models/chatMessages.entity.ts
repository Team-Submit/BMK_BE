import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class ChatMessages{
    @PrimaryGeneratedColumn({type: 'bigint'})
    messageId!: number;
    
    @Column({type: 'bigint', unique: true})
    roomId!: number;

    @Column({type: 'int', unique: true})
    senderId!: number;

    @Column({type: 'varchar'})
    content!: string;

    @Column({type: 'datetime'})
    sendTime!: Date;
}