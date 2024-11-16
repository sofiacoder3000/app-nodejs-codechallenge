import { Inject, Injectable } from '@nestjs/common';
import { ITransactionService } from '@transaction/application/services/transaction.service.interface';
import { ICreateTransactionUseCase } from '@transaction/application/use-cases/create-transaction-use-case.interface';
import { CreateTransactionDTO } from '@transaction/application/dtos/request/create-transaction.dto';
import { TransactionResponseDTO } from '@transaction/application/dtos/transaction-response.dto';
import { IGetTransactionsUseCase } from '@transaction/application/use-cases/get-transactions-use-case.interface';
import { UpdateTransactionDTO } from '@transaction/application/dtos/request/update-transaction.dto';
import { IUpdateTransactionUseCase } from '@transaction/application/use-cases/update-transaction-use-case.interface';
import { PatchTransactionDTO } from '@transaction/application/dtos/request/patch-transaction.dto';
import { GetTransactionsInputDTO } from '@transaction/application/dtos/request/get-transaction-input.dto';
import { PaginatedTransactionsDTO } from '@transaction/application/dtos/paginated-transactions.dto';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @Inject('ICreateTransactionUseCase')
    private readonly createTransactionUseCase: ICreateTransactionUseCase,
    @Inject('IGetTransactionsUseCase')
    private readonly getTransactionsUseCase: IGetTransactionsUseCase,
    @Inject('IUpdateTransactionUseCase')
    private readonly updateTransactionUseCase: IUpdateTransactionUseCase,
  ) {}

  async createTransaction(
    input: CreateTransactionDTO,
  ): Promise<TransactionResponseDTO> {
    return this.createTransactionUseCase.execute(input);
  }

  async getTransactions(
    filters: GetTransactionsInputDTO,
  ): Promise<PaginatedTransactionsDTO> {
    return this.getTransactionsUseCase.getTransactionsByFilters(filters);
  }

  async getTransaction(id: string): Promise<TransactionResponseDTO> {
    return this.getTransactionsUseCase.getTransactionById(id);
  }

  async patchTransaction(
    id: string,
    input: PatchTransactionDTO,
  ): Promise<TransactionResponseDTO> {
    return this.updateTransactionUseCase.patch(id, input);
  }

  async updateTransaction(
    id: string,
    input: UpdateTransactionDTO,
  ): Promise<TransactionResponseDTO> {
    return this.updateTransactionUseCase.update(id, input);
  }
}
