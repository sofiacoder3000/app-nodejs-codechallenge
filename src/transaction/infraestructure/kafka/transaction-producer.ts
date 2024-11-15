import { Injectable } from '@nestjs/common';
import { kafkaProducer, KAFKA_TOPICS } from '@shared/config/kafka.config';
import { CheckTransactionDTO } from '@antifraud/application/dtos/check-transaction.dto';
import { ITransactionProducer } from '@transaction/application/ports/transaction-producer.interface';
import { Transaction } from '@transaction/domain/models/transaction';

@Injectable()
export class TransactionProducer implements ITransactionProducer {
  async sendTransactionCreatedEvent(transaction: Transaction): Promise<void> {
    const checkTransactionDTO = {
      transactionId: transaction.transactionExternalId,
      value: transaction.value,
    } as CheckTransactionDTO;

    await kafkaProducer.connect();
    const message = {
      key: transaction.transactionExternalId,
      value: JSON.stringify(checkTransactionDTO),
    };

    await kafkaProducer.send({
      topic: KAFKA_TOPICS.TRANSACTION_CREATED,
      messages: [message],
    });

    await kafkaProducer.disconnect();
    console.log(`Transaction event sent: ${transaction.transactionExternalId}`);
  }
}
