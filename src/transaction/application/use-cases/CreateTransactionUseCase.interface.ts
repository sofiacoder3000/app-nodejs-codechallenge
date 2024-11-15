import { CreateTransactionDTO } from '@transaction/application/dtos/request/CreateTransaction.dto';
import { TransactionResponseDTO } from '@transaction/application/dtos/TransactionResponse.dto';

export interface ICreateTransactionUseCase {
  execute(data: CreateTransactionDTO): Promise<TransactionResponseDTO>;
}
