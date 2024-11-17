import { Module } from '@nestjs/common';
import { AntiFraudController } from '@antifraud/infrastructure/controllers/anti-fraud.controller';
import { AntiFraudResolver } from '@antifraud/infrastructure/resolvers/anti-fraud.resolver';
import { AntifraudService } from '@antifraud/infrastructure/services/anti-fraud.service';
import { CheckFraudService } from '@antifraud/application/use-cases/check-fraud/check-fraud.service';
import { IsFraudService } from '@antifraud/application/use-cases/is-fraud/is-fraud.service';
import { AntiFraudConsumer } from '@antifraud/infrastructure/kafka/anti-fraud.consumer';
import { TransactionService } from '@transaction/infraestructure/services/transaction.service';
import { TransactionModule } from '@transaction/transaction.module';
import { KafkaModule } from '@shared/kafka/kafka.module';

@Module({
  imports: [TransactionModule, KafkaModule],
  providers: [
    {
      provide: 'IAntifraudService',
      useClass: AntifraudService,
    },
    {
      provide: 'IIsFraudService',
      useClass: IsFraudService,
    },
    {
      provide: 'ICheckFraudService',
      useClass: CheckFraudService,
    },
    AntiFraudResolver,
    AntiFraudConsumer,
    {
      provide: 'ITransactionService',
      useClass: TransactionService,
    },
  ],
  controllers: [AntiFraudController],
})
export class AntiFraudModule {}
