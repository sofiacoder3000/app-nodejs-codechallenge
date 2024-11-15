import { AntiFraudResponseDTO } from '@antifraud/application/dtos/anti-fraud-response.dto';
import { CheckTransactionDTO } from '@antifraud/application/dtos/check-transaction.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckFraudService {
  execute(transactionAmount: number): boolean {
    return transactionAmount > 1000;
  }

  async checkTransaction(
    input: CheckTransactionDTO,
  ): Promise<AntiFraudResponseDTO> {
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
