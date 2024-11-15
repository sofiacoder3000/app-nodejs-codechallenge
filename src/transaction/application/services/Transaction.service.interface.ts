import { CreateTransactionDTO } from '@transaction/application/dtos/request/createTransaction.dto';
import { UpdateTransactionDTO } from '@transaction/application/dtos/request/updateTransaction.dto';
import { PatchTransactionDTO } from '@transaction/application/dtos/request/patchTransaction.dto';
import { TransactionResponseDTO } from '@transaction/application/dtos/transactionResponse.dto';

export interface ITransactionService {
  createTransaction(
    input: CreateTransactionDTO,
  ): Promise<TransactionResponseDTO>;

  getTransactions(): Promise<TransactionResponseDTO[]>;

  getTransaction(id: string): Promise<TransactionResponseDTO>;

  patchTransaction(
    id: string,
    input: PatchTransactionDTO,
  ): Promise<TransactionResponseDTO>;

  updateTransaction(
    id: string,
    input: UpdateTransactionDTO,
  ): Promise<TransactionResponseDTO>;
}
