import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import User from "./user.entity";

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

    @ManyToMany(() => User)
    @JoinTable()
    participants!: User[];
}