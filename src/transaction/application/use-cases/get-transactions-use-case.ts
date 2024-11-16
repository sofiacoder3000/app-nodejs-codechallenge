import { Inject } from '@nestjs/common';
import { IGetTransactionsUseCase } from '@transaction/application/use-cases/get-transactions-use-case.interface';
import { TransactionResponseDTO } from '@transaction/application/dtos/transaction-response.dto';
import { TransactionMapper } from '@transaction/application/mappers/transaction.mapper';
import { ITransactionRepository } from '@transaction/domain/ports/transaction.repository.interface';
import { GetTransactionsInputDTO } from '@transaction/application/dtos/request/get-transaction-input.dto';
import { PaginatedTransactionsDTO } from '@transaction/application/dtos/paginated-transactions.dto';

export class GetTransactionsUseCase implements IGetTransactionsUseCase {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async getTransactionsByFilters(
    inputFilters: GetTransactionsInputDTO,
  ): Promise<PaginatedTransactionsDTO> {
    const { offset, limit, filters: filtersDTO } = inputFilters;
    const filters = TransactionMapper.mapFilterDTOToTransaction(filtersDTO);
    const transactions = await this.transactionRepository.find(
      offset,
      limit,
      filters,
    );
    const transactionsDTO = transactions.map((transaction) =>
      TransactionMapper.toTransactionResponseDTO(transaction),
    );
    const response: PaginatedTransactionsDTO = {
      data: transactionsDTO,
      totalCount: transactionsDTO.length,
      limit,
      page: Math.floor(offset / limit) + 1,
    };
    return response;
  }

  async getTransactions(): Promise<PaginatedTransactionsDTO> {
    const transactions = await this.transactionRepository.findAll();
    const transactionsDTO = transactions.map((transaction) =>
      TransactionMapper.toTransactionResponseDTO(transaction),
    );
    const response: PaginatedTransactionsDTO = {
      data: transactionsDTO,
      totalCount: transactionsDTO.length,
      limit: transactionsDTO.length,
      page: 1,
    };
    return response;
  }

  async getTransactionById(id: string): Promise<TransactionResponseDTO> {
    const transaction = await this.transactionRepository.findById(id);
    const transactionDTO =
      TransactionMapper.toTransactionResponseDTO(transaction);
    return transactionDTO;
  }
}
