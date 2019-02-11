import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export default abstract class BaseModel extends BaseEntity {

    /**
   * class BaseModel
   * 
   * @description Serve the creation of models as BaseEntity
   */

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @CreateDateColumn({ name: "created_at" })
  public createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updatedAt: Date;

  @Column("timestamp with time zone", { name: "deleted_at", nullable: true })
  public deletedAt?: Date;

  constructor(data: Partial<BaseModel>) {
    super();
    Object.assign(this, data);
  }

  public toJSON() {
    return this;
  }
}