import { UpdateTransactionDTO } from '@transaction/application/dtos/request/update-transaction.dto';
import { PatchTransactionDTO } from '@transaction/application/dtos/request/patch-transaction.dto';
import { TransactionResponseDTO } from '@transaction/application/dtos/transaction-response.dto';

export interface IUpdateTransactionUseCase {
  patch(
    id: string,
    patchData: PatchTransactionDTO,
  ): Promise<TransactionResponseDTO>;

  update(
    id: string,
    updateData: UpdateTransactionDTO,
  ): Promise<TransactionResponseDTO>;
}
