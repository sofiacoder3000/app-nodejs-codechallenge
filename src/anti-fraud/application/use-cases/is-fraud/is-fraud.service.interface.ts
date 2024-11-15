import { CheckTransactionDTO } from '@antifraud/application/dtos/check-transaction.dto';

export interface IIsFraudService {
  execute(input: CheckTransactionDTO): boolean;
}
