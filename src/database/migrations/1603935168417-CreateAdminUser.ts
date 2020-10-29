import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import User from "../../models/User";

export class CreateAdminUser1603933585447 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the default user
    let user = new User();
    user.email = 'lsferreirapel@gmail.com';
    user.password = '24Lf4Ug2eJyCUy';
    user.hashPassword();
    user.role = 'ADMIN';

    // Save the user on database
    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }
}
