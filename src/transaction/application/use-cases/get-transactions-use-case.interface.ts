import { TransactionResponseDTO } from '@transaction/application/dtos/transaction-response.dto';
import { GetTransactionsInputDTO } from '@transaction/application/dtos/request/get-transaction-input.dto';
import { PaginatedTransactionsDTO } from '@transaction/application/dtos/paginated-transactions.dto';

export interface IGetTransactionsUseCase {
  getTransactionsByFilters(
    inputFilters: GetTransactionsInputDTO,
  ): Promise<PaginatedTransactionsDTO>;
  getTransactions(): Promise<PaginatedTransactionsDTO>;
  getTransactionById(id: string): Promise<TransactionResponseDTO>;
}
