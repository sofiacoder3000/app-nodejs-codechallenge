import { Injectable } from '@nestjs/common';
import { IIsFraudService } from '@antifraud/application/use-cases/is-fraud/is-fraud.service.interface';
import { CheckTransactionDTO } from '@antifraud/application/dtos/check-transaction.dto';

@Injectable()
export class IsFraudService implements IIsFraudService {
  execute(input: CheckTransactionDTO): boolean {
    return input.value > 1000;
  }
}
