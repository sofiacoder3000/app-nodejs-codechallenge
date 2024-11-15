import { TransactionResponseDTO } from '@transaction/application/dtos/TransactionResponse.dto';

export interface IGetTransactionsUseCase {
  getTransactions(): Promise<TransactionResponseDTO[]>;
  getTransactionById(id: string): Promise<TransactionResponseDTO>;
}
