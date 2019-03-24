import { Column, Entity } from "typeorm";
import { ExtendedEntity } from "../base";

@Entity(FileModel.TABLE_NAME)
export default class FileModel extends ExtendedEntity {
  private static readonly TABLE_NAME = "files";
  
  @Column({ nullable: false })
  public filename: string;

  @Column({ nullable: false })
  public type: string;

  @Column({nullable: true})
  public hash: string;

  constructor(data: Partial<FileModel> = {}) {
    super(data);
  }

  public toJSON(): any {
    const base = super.toJSON();
    return {
      filename: this.filename,
      type: this.type,
      ...base
    };
  }
}