import { Injectable } from '@nestjs/common';
import { AntiFraudResponseDTO } from '@antifraud/application/dtos/anti-fraud-response.dto';
import { CheckTransactionDTO } from '@antifraud/application/dtos/check-transaction.dto';
import { ICheckFraudService } from '@antifraud/application/use-cases/check-fraud/check-fraud.service.interface';

@Injectable()
export class CheckFraudService implements ICheckFraudService {
  execute(input: CheckTransactionDTO): AntiFraudResponseDTO {
    const { value } = input;

    const isValid = value <= 1000;

    return {
      isValid,
      reason: isValid
        ? null
        : `Transaction was rejected due to exceeding the limit.`,
    };
  }
}
