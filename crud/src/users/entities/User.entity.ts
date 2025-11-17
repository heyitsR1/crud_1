import { Column, PrimaryGeneratedColumn,Entity, Generated } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({unique:true})
  username: string;

  @Column()
  password: string;

  @Column('text', { array: true, default: [] })
  roles:string[]

  @Column()
  @Generated('uuid')
  uuid:string[]

}
