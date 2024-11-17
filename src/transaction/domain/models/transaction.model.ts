import { TransactionStatus } from '@transaction/domain/enums/transaction-status.enum';
import { TransferType } from '@transaction/domain/enums/transfer-type.enum';

export class Transaction {
  transactionExternalId?: string;
  accountExternalIdDebit: string;
  accountExternalIdCredit: string;
  transferTypeId: TransferType;
  transactionStatus: TransactionStatus;
  value: number;
  createdAt?: number;

  constructor(params: Partial<Transaction>) {
    this.transactionExternalId = params.transactionExternalId;
    this.accountExternalIdDebit = params.accountExternalIdDebit;
    this.accountExternalIdCredit = params.accountExternalIdCredit;
    this.transferTypeId = params.transferTypeId;
    this.transactionStatus = params.transactionStatus;
    this.value = params.value;
    this.createdAt = params.createdAt;
  }
}
