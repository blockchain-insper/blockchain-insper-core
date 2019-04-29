import { Column, Entity } from 'typeorm';
import { ExtendedEntity } from './base';

export enum TypeContract{
  ERC20 = "ERC20",
  Hash = "HASH"
}

@Entity(EthereumModel.tableName)
export default class EthereumModel extends ExtendedEntity {
  private static readonly tableName = 'ethereums';

  @Column({ nullable: false })
  public type: TypeContract;

  @Column({ nullable: false })
  public address: string;

  @Column({ nullable: false })
  public private: string;

  @Column({ nullable: false })
  public hashContract: string;

  constructor(data: Partial<EthereumModel>) {
    super(data);
  }
}
