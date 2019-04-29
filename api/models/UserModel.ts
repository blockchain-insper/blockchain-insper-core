import { Column, Entity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ExtendedEntity } from "./base";
import { generateSalt, hashPassword } from "../helpers/SecurityHelper";

enum UserRole {
  DEVELOPER = "developer",
  ANALYST = "analyst"
}

@Entity(UserModel.TABLE_NAME)
export default class UserModel extends ExtendedEntity {
  private static readonly TABLE_NAME = "users";
  
  @Column({ nullable: false })
  public firstName: string;

  @Column({ nullable: false })
  public lastName: string;

  @Column({ nullable: false, unique: true })
  public email: string;

  @Column({ nullable: false, default: UserRole.DEVELOPER })
  public role: UserRole;

  @Column({ nullable: true})
  public password_hash: string

  @Column({ nullable: true})
  public password_salt: string

  constructor(data: Partial<UserModel>) {
    super(data);
  }

  public async setPassword(password: string) {
    try {
      this.password_salt = generateSalt()
      this.password_hash = hashPassword(password, this.password_salt)
    } catch (error) {
      console.error(error)
    }
  }

  public static async findByEmail(email: string) {
    return this.findOne({where:{email}})
  }
}
