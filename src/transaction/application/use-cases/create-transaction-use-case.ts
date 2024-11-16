import { Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '@transaction/domain/ports/transaction.repository.interface';
import { CreateTransactionDTO } from '@transaction/application/dtos/request/create-transaction.dto';
import { TransactionMapper } from '@transaction/application/mappers/transaction.mapper';
import { TransactionResponseDTO } from '@transaction/application/dtos/transaction-response.dto';
import { ICreateTransactionUseCase } from '@transaction/application/use-cases/create-transaction-use-case.interface';
import { ITransactionProducer } from '@transaction/application/ports/transaction-producer.interface';
@Injectable()
export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    @Inject('ITransactionProducer')
    private readonly transactionProducer: ITransactionProducer,
  ) {}

  async execute(data: CreateTransactionDTO): Promise<TransactionResponseDTO> {
    const transactionInput = TransactionMapper.toDomain(data);
    const transactionCreated =
      await this.transactionRepository.create(transactionInput);
    await this.transactionProducer.sendTransactionCreatedEvent(
      transactionCreated,
    );

    return TransactionMapper.toTransactionResponseDTO(transactionCreated);
  }
}
