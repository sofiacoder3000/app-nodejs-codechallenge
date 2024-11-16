import { Inject } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateTransactionDTO } from '@transaction/application/dtos/request/create-transaction.dto';
import { TransactionResponseDTO } from '@transaction/application/dtos/transaction-response.dto';
import { UpdateTransactionDTO } from '@transaction/application/dtos/request/update-transaction.dto';
import { ITransactionService } from '@transaction/application/services/transaction.service.interface';
import { PatchTransactionDTO } from '@transaction/application/dtos/request/patch-transaction.dto';
import { GetTransactionsInputDTO } from '@transaction/application/dtos/request/get-transaction-input.dto';
import { PaginatedTransactionsDTO } from '@transaction/application/dtos/paginated-transactions.dto';

@Resolver()
export class TransactionResolver {
  constructor(
    @Inject('ITransactionService')
    private readonly transactionService: ITransactionService,
  ) {}

  @Query(() => PaginatedTransactionsDTO)
  async getTransactions(
    @Args('input', { type: () => GetTransactionsInputDTO, nullable: true })
    input?: GetTransactionsInputDTO,
  ): Promise<PaginatedTransactionsDTO> {
    return this.transactionService.getTransactions(input);
  }

  @Query(() => TransactionResponseDTO)
  async getTransaction(
    @Args('id') id: string,
  ): Promise<TransactionResponseDTO> {
    return this.transactionService.getTransaction(id);
  }

  @Mutation(() => TransactionResponseDTO)
  async createTransaction(@Args('input') input: CreateTransactionDTO) {
    return this.transactionService.createTransaction(input);
  }

  @Mutation(() => TransactionResponseDTO)
  async patchTransaction(
    @Args('id') id: string,
    @Args('input') input: PatchTransactionDTO,
  ) {
    return this.transactionService.patchTransaction(id, input);
  }

  @Mutation(() => TransactionResponseDTO)
  async updateTransaction(
    @Args('id') id: string,
    @Args('input') input: UpdateTransactionDTO,
  ) {
    return this.transactionService.updateTransaction(id, input);
  }
}
