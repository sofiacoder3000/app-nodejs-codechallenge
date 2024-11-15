import { TransactionResponseDTO } from '@transaction/application/dtos/transactionResponse.dto';

export interface IGetTransactionsUseCase {
  getTransactions(): Promise<TransactionResponseDTO[]>;
  getTransactionById(id: string): Promise<TransactionResponseDTO>;
}
