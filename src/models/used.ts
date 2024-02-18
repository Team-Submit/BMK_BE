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

enum Floor {
    first = '1층',
    second = '2층',
    third = '3층',
    fourth = '4층',
    fifth = '5층'
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

    @Column({
        default: true // success의 기본값을 true로 설정
    })
    success!: boolean;

    @Column()
    writer!: string;

    @Column({
        default: false // wish의 기본값을 false로 설정
    })
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

    @Column({
        type: 'enum',
        enum: Floor,
        default: Floor.fifth
    })
    floor!: Floor;
}