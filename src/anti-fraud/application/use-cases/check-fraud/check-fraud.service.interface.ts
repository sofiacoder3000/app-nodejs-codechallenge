import { AntiFraudResponseDTO } from '@antifraud/application/dtos/anti-fraud-response.dto';
import { CheckTransactionDTO } from '@antifraud/application/dtos/check-transaction.dto';

export interface ICheckFraudService {
  execute(input: CheckTransactionDTO): AntiFraudResponseDTO;
}
