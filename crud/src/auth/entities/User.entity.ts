import { Column, PrimaryGeneratedColumn,Entity } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({unique:true})
  username: string;

  @Column({select:false})
  password: string;

  @Column('text', { array: true, default: [] })
  roles:string[]

}
