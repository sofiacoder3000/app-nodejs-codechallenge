import { Transaction } from '@transaction/domain/models/transaction';

export interface ITransactionProducer {
  sendTransactionCreatedEvent(transaction: Transaction): Promise<void>;
}
