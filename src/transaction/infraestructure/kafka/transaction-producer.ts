import { Injectable } from '@nestjs/common';
import { CheckTransactionDTO } from '@antifraud/application/dtos/check-transaction.dto';
import { ITransactionProducer } from '@transaction/application/ports/transaction-producer.interface';
import { Transaction } from '@transaction/domain/models/transaction';
import { KafkaService } from '@shared/kafka/kafka.service';
import { KAFKA_TOPICS } from '@shared/kafka/kafka.config';

@Injectable()
export class TransactionProducer implements ITransactionProducer {
  constructor(private readonly kafkaService: KafkaService) {}

  async sendTransactionCreatedEvent(transaction: Transaction): Promise<void> {
    const checkTransactionDTO = {
      transactionId: transaction.transactionExternalId,
      value: transaction.value,
    } as CheckTransactionDTO;

    const producer = this.kafkaService.getProducer();

    const message = {
      key: transaction.transactionExternalId,
      value: JSON.stringify(checkTransactionDTO),
    };

    await producer.send({
      topic: KAFKA_TOPICS.TRANSACTION_CREATED,
      messages: [message],
    });
  }
}
