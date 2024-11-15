import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { TransferType } from '@transaction/domain/enums/transfer-type.enum';
import { TransactionStatus } from '@transaction/domain/enums/transaction-status.enum'; // Enum para los estados

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  transactionExternalId: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  accountExternalIdDebit: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  accountExternalIdCredit: string;

  @Column({
    type: 'int',
    enum: TransferType,
    nullable: false,
  })
  transferTypeId: TransferType;

  @Column({
    type: 'int',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  transactionStatus: TransactionStatus;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  value: number;

  @Column({ type: 'bigint', nullable: false })
  createdAt: number;

  @BeforeInsert()
  setCreationDate() {
    this.createdAt = Date.now(); // Se asigna solo al insertar la entidad
  }
}
