import { Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '@transaction/domain/repositories/transaction.repository.interface';
import { CreateTransactionDTO } from '@transaction/application/dtos/request/createTransaction.dto';
import { TransactionMapper } from '@transaction/application/mappers/transaction.mapper';
import { TransactionResponseDTO } from '@transaction/application/dtos/transactionResponse.dto';
import { ICreateTransactionUseCase } from '@transaction/application/use-cases/create-transaction-use-case.interface';
@Injectable()
export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute(data: CreateTransactionDTO): Promise<TransactionResponseDTO> {
    const transactionInput = TransactionMapper.toDomain(data);
    const transactionOutput =
      await this.transactionRepository.create(transactionInput);
    return TransactionMapper.toTransactionResponseDTO(transactionOutput);
  }
}
