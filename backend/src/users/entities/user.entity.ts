import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '../dto/create-user.dto';

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

  @Column('timestamp')
  birthDate: Date;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column({ default: false })
  isEmailConfirmed: boolean;
}
