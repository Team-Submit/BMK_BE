import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import User from "./user.entity";

@Entity()
export default class ChatRooms {
    @PrimaryGeneratedColumn({type: 'bigint'})
    roomId!: number;
    
    @Column({type: 'varchar'})
    roomName!: string;

    @Column({type: 'int', default: 1})
    studentId!: number;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createDate!: Date;

    @ManyToMany(() => User)
    @JoinTable()
    participants!: User[];
}