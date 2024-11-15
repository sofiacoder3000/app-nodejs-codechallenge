import { Inject } from '@nestjs/common';
import { IGetTransactionsUseCase } from '@transaction/application/use-cases/GetTransactionsUseCase.interface';
import { TransactionResponseDTO } from '@transaction/application/dtos/TransactionResponse.dto';
import { TransactionMapper } from '@transaction/application/mappers/Transaction.mapper';
import { ITransactionRepository } from '@transaction/domain/repositories/ITransactionRepository';

export class GetTransactionsUseCase implements IGetTransactionsUseCase {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async getTransactions(): Promise<TransactionResponseDTO[]> {
    const transactions = await this.transactionRepository.findAll();
    const transactionsDTO = transactions.map((transaction) =>
      TransactionMapper.toTransactionResponseDTO(transaction),
    );
    return transactionsDTO;
  }

  async getTransactionById(id: string): Promise<TransactionResponseDTO> {
    const transaction = await this.transactionRepository.findById(id);
    const transactionDTO =
      TransactionMapper.toTransactionResponseDTO(transaction);
    return transactionDTO;
  }
}
