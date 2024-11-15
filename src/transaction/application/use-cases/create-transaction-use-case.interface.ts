import { CreateTransactionDTO } from '@transaction/application/dtos/request/createTransaction.dto';
import { TransactionResponseDTO } from '@transaction/application/dtos/transactionResponse.dto';

export interface ICreateTransactionUseCase {
  execute(data: CreateTransactionDTO): Promise<TransactionResponseDTO>;
}
