import { Module } from '@nestjs/common';
import { CheckFraudService } from '@antifraud/application/check-fraud/check-fraud.service';
import { AntiFraudController } from '@antifraud/infrastructure/controllers/anti-fraud.controller';
import { AntiFraudResolver } from '@antifraud/infrastructure/resolvers/anti-fraud.resolver';

@Module({
  providers: [CheckFraudService, AntiFraudResolver],
  controllers: [AntiFraudController],
})
export class AntiFraudModule {}
