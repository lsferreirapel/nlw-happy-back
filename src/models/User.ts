import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcryptjs';


@Entity('users')
@Unique(['email'])
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column()
  @IsNotEmpty()
  @Length(6, 100)
  password: string;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
