import { Resolver, Query, Args } from '@nestjs/graphql';
import { CheckFraudService } from '@antifraud/application/check-fraud/check-fraud.service';
import { AntiFraudResponseDTO } from '@antifraud/application/dtos/anti-fraud-response.dto';
import { CheckTransactionDTO } from '@antifraud/application/dtos/check-transaction.dto';

@Resolver(() => AntiFraudResponseDTO)
export class AntiFraudResolver {
  constructor(private readonly checkFraudService: CheckFraudService) {}

  @Query(() => String, { description: 'Health check for Anti-Fraud service' })
  healthCheck(): string {
    return 'Anti-Fraud service is running';
  }

  @Query(() => AntiFraudResponseDTO, {
    description: 'Check transaction status',
  })
  async checkTransaction(
    @Args('input') input: CheckTransactionDTO,
  ): Promise<AntiFraudResponseDTO> {
    return this.checkFraudService.checkTransaction(input);
  }
}
