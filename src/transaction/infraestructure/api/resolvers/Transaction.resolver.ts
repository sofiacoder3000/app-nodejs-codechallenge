import { Inject } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateTransactionDTO } from '@transaction/application/dtos/request/createTransaction.dto';
import { TransactionResponseDTO } from '@transaction/application/dtos/transactionResponse.dto';
import { UpdateTransactionDTO } from '@transaction/application/dtos/request/updateTransaction.dto';
import { ITransactionService } from '@transaction/application/services/transaction.service.interface';
import { PatchTransactionDTO } from '@transaction/application/dtos/request/patchTransaction.dto';

@Resolver()
export class TransactionResolver {
  constructor(
    @Inject('ITransactionService')
    private readonly transactionService: ITransactionService,
  ) {}

  @Query(() => [TransactionResponseDTO])
  async getTransactions(): Promise<TransactionResponseDTO[]> {
    return this.transactionService.getTransactions();
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
