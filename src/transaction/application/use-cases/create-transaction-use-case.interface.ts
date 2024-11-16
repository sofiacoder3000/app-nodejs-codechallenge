import { CreateTransactionDTO } from '@transaction/application/dtos/request/create-transaction.dto';
import { TransactionResponseDTO } from '@transaction/application/dtos/transaction-response.dto';

export interface ICreateTransactionUseCase {
  execute(data: CreateTransactionDTO): Promise<TransactionResponseDTO>;
}
