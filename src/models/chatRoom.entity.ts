import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class ChatRooms {
    @PrimaryGeneratedColumn({type: 'bigint'})
    roomId!: number;
    
    @Column({type: 'varchar'})
    roomName!: string;

    @Column({type: 'int', unique: true})
    userId!: number;

    @Column({type: 'date'})
    createDate!: string;
}