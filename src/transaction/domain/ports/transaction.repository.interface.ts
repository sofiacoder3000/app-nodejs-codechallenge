import { Transaction } from '@transaction/domain/models/transaction';

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
  findById(transactionId: string): Promise<Transaction | null>;
  findAll(): Promise<Transaction[]>;
  update(
    transactionId: string,
    updatedData: Partial<Transaction>,
  ): Promise<void>;
  patch(
    transactionId: string,
    updatedData: Partial<Transaction>,
  ): Promise<Transaction>;
}
