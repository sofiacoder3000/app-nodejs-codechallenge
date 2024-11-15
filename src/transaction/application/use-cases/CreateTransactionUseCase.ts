import { Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '@transaction/domain/repositories/ITransactionRepository';
import { CreateTransactionDTO } from '@transaction/application/dtos/request/CreateTransaction.dto';
import { TransactionMapper } from '@transaction/application/mappers/Transaction.mapper';
import { TransactionResponseDTO } from '@transaction/application/dtos/TransactionResponse.dto';
import { ICreateTransactionUseCase } from '@transaction/application/use-cases/CreateTransactionUseCase.interface';
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
