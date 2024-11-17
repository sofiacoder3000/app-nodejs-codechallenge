import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CheckTransactionDTO } from '@antifraud/application/dtos/check-transaction.dto';
import { KAFKA_TOPICS } from '@shared/kafka/kafka.config';
import { IAntifraudService } from '@antifraud/application/services/anti-fraud.service.interface';
import { ITransactionService } from '@transaction/application/services/transaction.service.interface';
import { TransactionStatus } from '@transaction/domain/enums/transaction-status.enum';
import { KafkaService } from '@shared/kafka/kafka.service';

@Injectable()
export class AntiFraudConsumer implements OnModuleInit {
  constructor(
    @Inject('IAntifraudService')
    private readonly antifraudService: IAntifraudService,
    @Inject('ITransactionService')
    private readonly transactionService: ITransactionService,
    private readonly kafkaService: KafkaService,
  ) {}

  async onModuleInit() {
    const consumer = this.kafkaService.getConsumer();
    await consumer.subscribe({
      topic: KAFKA_TOPICS.TRANSACTION_CREATED,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const checkTransactionDTO = JSON.parse(
          message.value.toString(),
        ) as CheckTransactionDTO;
        const isFraud = this.antifraudService.isFraud(checkTransactionDTO);
        const transactionStatus = isFraud
          ? TransactionStatus.REJECTED
          : TransactionStatus.APPROVED;
        console.log(
          `Received transaction:
          ${JSON.stringify(checkTransactionDTO)} + ' is:' + ${TransactionStatus[transactionStatus]} from topic ${topic} and partition: ${partition}`,
        );
        this.transactionService.patchTransaction(
          checkTransactionDTO.transactionId,
          { transactionStatus },
        );
      },
    });
  }
}
