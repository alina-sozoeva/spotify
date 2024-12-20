import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  birthDate: Date;

  @Column()
  gender: Date;

  @Column({ default: false })
  isEmailConfirmed: boolean;
}
