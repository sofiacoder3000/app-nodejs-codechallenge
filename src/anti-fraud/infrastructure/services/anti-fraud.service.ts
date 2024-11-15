import { Inject, Injectable } from '@nestjs/common';
import { CheckTransactionDTO } from '@antifraud/application/dtos/check-transaction.dto';
import { AntiFraudResponseDTO } from '@antifraud/application/dtos/anti-fraud-response.dto';
import { IAntifraudService } from '@antifraud/application/services/anti-fraud.service.interface';
import { CheckFraudService } from '@antifraud/application/use-cases/check-fraud/check-fraud.service';
import { IsFraudService } from '@antifraud/application/use-cases/is-fraud/is-fraud.service';

@Injectable()
export class AntifraudService implements IAntifraudService {
  constructor(
    @Inject('ICheckFraudService')
    private readonly checkFraudUseCase: CheckFraudService,
    @Inject('IIsFraudService')
    private readonly isFraudUseCase: IsFraudService,
  ) {}

  isFraud(input: CheckTransactionDTO): boolean {
    return this.isFraudUseCase.execute(input);
  }
  checkFraud(input: CheckTransactionDTO): AntiFraudResponseDTO {
    return this.checkFraudUseCase.execute(input);
  }
}
