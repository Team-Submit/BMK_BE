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
export class Group {
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
    personnelAll!: string;

    @Column()
    transactionDate!: string;

    @Column({
        default: true // success의 기본값을 true로 설정
    })
    success!: boolean;

    @Column({
        default: false // wish의 기본값을 false로 설정
    })
    wish!: boolean | null;

    @Column()
    time!: string;

    @Column({
        type: 'enum',
        enum: Category,
        default: Category.etc
    })
    categori!: Category;
}