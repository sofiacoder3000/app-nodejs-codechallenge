import { Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '@transaction/domain/repositories/ITransactionRepository';
import { TransactionMapper } from '@transaction/application/mappers/Transaction.mapper';
import { TransactionResponseDTO } from '@transaction/application/dtos/TransactionResponse.dto';
import { IUpdateTransactionUseCase } from '@transaction/application/use-cases/UpdateTransactionUseCase.interface';
import { Transaction } from '@transaction/domain/models/Transaction';
import { UpdateTransactionDTO } from '../dtos/request/UpdateTransaction.dto';
@Injectable()
export class UpdateTransactionUseCase implements IUpdateTransactionUseCase {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async patch(
    id: string,
    updateData: Partial<UpdateTransactionDTO>,
  ): Promise<TransactionResponseDTO> {
    const partialTransaction: Partial<Transaction> =
      TransactionMapper.mapUpdateDTOToTransaction(id, updateData);
    const transactionOutput = await this.transactionRepository.patch(
      id,
      partialTransaction,
    );
    return TransactionMapper.toTransactionResponseDTO(transactionOutput);
  }

  async update(
    id: string,
    updateData: UpdateTransactionDTO,
  ): Promise<TransactionResponseDTO> {
    const updatedDataTransaction: Transaction =
      TransactionMapper.mapUpdateDTOToTransaction(id, updateData);
    await this.transactionRepository.update(id, updatedDataTransaction);
    const updatedTransaction = await this.transactionRepository.findById(id);
    return TransactionMapper.toTransactionResponseDTO(updatedTransaction);
  }
}
