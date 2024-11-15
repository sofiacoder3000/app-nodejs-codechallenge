import { Resolver, Query, Args } from '@nestjs/graphql';
import { AntiFraudResponseDTO } from '@antifraud/application/dtos/anti-fraud-response.dto';
import { CheckTransactionDTO } from '@antifraud/application/dtos/check-transaction.dto';
import { IAntifraudService } from '@antifraud/application/services/anti-fraud.service.interface';
import { Inject } from '@nestjs/common';

@Resolver(() => AntiFraudResponseDTO)
export class AntiFraudResolver {
  constructor(
    @Inject('IAntifraudService')
    private readonly antifraudService: IAntifraudService,
  ) {}

  @Query(() => String, { description: 'Health check for Anti-Fraud service' })
  healthCheck(): string {
    return 'Anti-Fraud service is running';
  }

  @Query(() => AntiFraudResponseDTO, {
    description: 'Check transaction status',
  })
  checkTransaction(
    @Args('input') input: CheckTransactionDTO,
  ): AntiFraudResponseDTO {
    return this.antifraudService.checkFraud(input);
  }
}
