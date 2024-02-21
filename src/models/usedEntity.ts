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
export default class Used {
    @PrimaryGeneratedColumn({type: 'bigint'})
    used_id!: number;
    
    @Column({type: 'varchar'})
    title!: string;

    @Column({type: 'varchar'})
    content!: string;

    @Column({type: 'varchar'})
    price!: string;

    @Column({type: 'varchar'})
    place!: string;

    @Column({type: 'varchar'})
    image!: string;

    @Column({
        type: 'boolean',
        default: true // success의 기본값을 true로 설정
    })
    success!: boolean;

    @Column({type: 'varchar'})
    writer!: string;

    @Column({
        type: 'boolean',
        default: false // wish의 기본값을 false로 설정
    })
    wish!: boolean;

    @Column({type: 'varchar', unique: true})
    room_id!: string;

    @Column({type: 'boolean'})
    review_check!: boolean;

    @Column({
        type: 'enum',
        enum: Category,
        default: Category.etc
    })
    category!: Category;
}