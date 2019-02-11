import { Column, Entity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ExtendedEntity } from "./base";

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

  @Column({ nullable: false })
  public password: string;

  @Column({ nullable: false, default: UserRole.DEVELOPER })
  public role: UserRole;

  constructor(data: Partial<UserModel> = {}) {
    super(data);
  }

  public toJSON(): any {
    const base = super.toJSON();
    return {
      firstName: this.firstName,
      email: this.email,
      ...base
    };
  }
}
