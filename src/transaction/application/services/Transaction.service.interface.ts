import { CreateTransactionDTO } from '@transaction/application/dtos/request/create-transaction.dto';
import { UpdateTransactionDTO } from '@transaction/application/dtos/request/update-transaction.dto';
import { PatchTransactionDTO } from '@transaction/application/dtos/request/patch-transaction.dto';
import { TransactionResponseDTO } from '@transaction/application/dtos/transaction-response.dto';
import { GetTransactionsInputDTO } from '@transaction/application/dtos/request/get-transaction-input.dto';
import { PaginatedTransactionsDTO } from '@transaction/application/dtos/paginated-transactions.dto';

export interface ITransactionService {
  createTransaction(
    input: CreateTransactionDTO,
  ): Promise<TransactionResponseDTO>;

  getTransactions(
    filters: GetTransactionsInputDTO,
  ): Promise<PaginatedTransactionsDTO>;

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
