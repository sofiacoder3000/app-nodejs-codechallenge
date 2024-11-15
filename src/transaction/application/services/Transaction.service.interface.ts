import { CreateTransactionDTO } from '@transaction/application/dtos/request/CreateTransaction.dto';
import { TransactionResponseDTO } from '@transaction/application/dtos/TransactionResponse.dto';
import { UpdateTransactionDTO } from '@transaction/application/dtos/request/UpdateTransaction.dto';

export interface ITransactionService {
  createTransaction(
    input: CreateTransactionDTO,
  ): Promise<TransactionResponseDTO>;

  getTransactions(): Promise<TransactionResponseDTO[]>;

  getTransaction(id: string): Promise<TransactionResponseDTO>;

  patchTransaction(
    id: string,
    input: Partial<UpdateTransactionDTO>,
  ): Promise<TransactionResponseDTO>;

  updateTransaction(
    id: string,
    input: UpdateTransactionDTO,
  ): Promise<TransactionResponseDTO>;
}
