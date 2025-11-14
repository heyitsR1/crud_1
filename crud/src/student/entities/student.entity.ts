import { Column, PrimaryGeneratedColumn,Entity } from 'typeorm';

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    name: string;
    
    @Column({type:'decimal',precision:4,scale:2})
    grade: number;

    @Column()
    contact: string;

    @Column()
    course: string; 

    @Column()
    email: string;


}