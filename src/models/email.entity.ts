import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Email{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id!: number;

    @Column({type: 'varchar'})
    email!: string;

    @Column({type: 'varchar'})
    key!: string;
}