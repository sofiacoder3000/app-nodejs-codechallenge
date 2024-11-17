import { Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '@transaction/domain/ports/transaction.repository.interface';
import { TransactionMapper } from '@transaction/application/mappers/transaction.mapper';
import { TransactionResponseDTO } from '@transaction/application/dtos/transaction-response.dto';
import { IUpdateTransactionUseCase } from '@transaction/application/use-cases/update-transaction-use-case.interface';
import { Transaction } from '@transaction/domain/models/transaction.model';
import { UpdateTransactionDTO } from '@transaction/application/dtos/request/update-transaction.dto';
import { PatchTransactionDTO } from '@transaction/application/dtos/request/patch-transaction.dto';
@Injectable()
export class UpdateTransactionUseCase implements IUpdateTransactionUseCase {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async patch(
    id: string,
    patchData: PatchTransactionDTO,
  ): Promise<TransactionResponseDTO> {
    const partialTransaction: Partial<Transaction> =
      TransactionMapper.mapPatchDTOToTransaction(id, patchData);
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
