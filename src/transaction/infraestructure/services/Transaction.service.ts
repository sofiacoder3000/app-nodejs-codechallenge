import { Inject, Injectable } from '@nestjs/common';
import { ITransactionService } from '@transaction/application/services/Transaction.service.interface';
import { ICreateTransactionUseCase } from '@transaction/application/use-cases/CreateTransactionUseCase.interface';
import { CreateTransactionDTO } from '@transaction/application/dtos/request/CreateTransaction.dto';
import { TransactionResponseDTO } from '@transaction/application/dtos/TransactionResponse.dto';
import { IGetTransactionsUseCase } from '@transaction/application/use-cases/GetTransactionsUseCase.interface';
import { UpdateTransactionDTO } from '@transaction/application/dtos/request/UpdateTransaction.dto';
import { IUpdateTransactionUseCase } from '@transaction/application/use-cases/UpdateTransactionUseCase.interface';

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

  async getTransactions(): Promise<TransactionResponseDTO[]> {
    return this.getTransactionsUseCase.getTransactions();
  }

  async getTransaction(id: string): Promise<TransactionResponseDTO> {
    return this.getTransactionsUseCase.getTransactionById(id);
  }

  async patchTransaction(
    id: string,
    input: Partial<UpdateTransactionDTO>,
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
