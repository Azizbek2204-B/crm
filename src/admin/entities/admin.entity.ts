import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    phone: string;

    @Column()
    hashed_password: string;

    @Column({ default: false })
    is_creator: boolean;

    @Column({ default: true })
    is_active: boolean;

    @Column()
    hashed_refresh_token: string
}