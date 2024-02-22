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
export default class Group {
    @PrimaryGeneratedColumn({type: 'bigint'})
    group_id!: number;
    
    @Column({type: 'varchar'})
    title!: string;

    @Column({type: 'varchar'})
    content!: string;

    @Column({type: 'varchar'})
    price!: string;

    @Column({type: 'varchar'})
    personnelAll!: String;

    @Column({type: 'varchar'})
    transactionDate!: String;

    @Column({type: 'varchar'})
    image!: string;

    @Column({type: 'varchar'})
    time!: string;

    @Column({type: 'varchar', unique: true})
    room_id!: string;

    @Column({type: 'boolean'})
    review_check!: boolean;

    @Column({
        type: 'boolean',
        default: false // wish의 기본값을 false로 설정
    })
    wish!: boolean;

    @Column({
        type: 'enum',
        enum: Category,
        default: Category.etc
    })
    category!: Category;
}