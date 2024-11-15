import { CheckTransactionDTO } from '@antifraud/application/dtos/check-transaction.dto';
import { AntiFraudResponseDTO } from '@antifraud/application/dtos/anti-fraud-response.dto';

export interface IAntifraudService {
  isFraud(input: CheckTransactionDTO): boolean;
  checkFraud(input: CheckTransactionDTO): AntiFraudResponseDTO;
}
