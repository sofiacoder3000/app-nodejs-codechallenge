import { Transaction } from '@transaction/domain/models/transaction.model';

export interface ITransactionProducer {
  sendTransactionCreatedEvent(transaction: Transaction): Promise<void>;
}
