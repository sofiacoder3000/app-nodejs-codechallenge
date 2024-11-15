import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CheckTransactionDTO } from '@antifraud/application/dtos/check-transaction.dto';
import { kafkaConsumer, KAFKA_TOPICS } from '@shared/config/kafka.config';
import { IAntifraudService } from '@antifraud/application/services/anti-fraud.service.interface';
import { ITransactionService } from '@transaction/application/services/transaction.service.interface';
import { TransactionStatus } from '@transaction/domain/enums/transaction-status.enum';

@Injectable()
export class AntiFraudConsumer implements OnModuleInit {
  constructor(
    @Inject('IAntifraudService')
    private readonly antifraudService: IAntifraudService,
    @Inject('ITransactionService')
    private readonly transactionService: ITransactionService,
  ) {}

  async onModuleInit() {
    await kafkaConsumer.connect();
    await kafkaConsumer.subscribe({
      topic: KAFKA_TOPICS.TRANSACTION_CREATED,
      fromBeginning: true,
    });

    await kafkaConsumer.run({
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
          ${JSON.stringify(checkTransactionDTO)} + ' is:' + ${TransactionStatus[transactionStatus]}`,
        );
        this.transactionService.patchTransaction(
          checkTransactionDTO.transactionId,
          { transactionStatus },
        );
      },
    });
  }
}
