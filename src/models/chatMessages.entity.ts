import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class ChatMessages{
    @PrimaryGeneratedColumn({type: 'bigint'})
    messageId!: number;
    
    @Column({type: 'bigint'})
    roomId!: number;

    @Column({type: 'int'})
    senderId!: number;

    @Column({type: 'varchar'})
    content!: string;

    @Column({type: 'datetime'})
    sendTime!: Date;
}