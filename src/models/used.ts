import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum Category {
    electronics = '전자기기',
    music = '음악',
    food = '식품',
    book = '책',
    life = '생활',
    vehicle = '차량',
    clothes = '옷•신발',
    etc = '기타'
}

@Entity()
export class Used {
    @PrimaryGeneratedColumn()
    used_id!: BigInt;
    
    @Column()
    title!: string;

    @Column()
    content!: string;

    @Column()
    price!: string;

    @Column()
    place!: string;

    @Column()
    image!: string | null;

    @Column()
    success!: boolean;

    @Column()
    writer!: string;

    @Column()
    wish!: boolean | null;

    @Column()
    room_id!: string;

    @Column()
    review_check!: boolean;

    @Column({
        type: 'enum',
        enum: Category,
        default: Category.etc
    })
    categori!: Category;
}