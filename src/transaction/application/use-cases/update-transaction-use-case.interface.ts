import { UpdateTransactionDTO } from '@transaction/application/dtos/request/updateTransaction.dto';
import { PatchTransactionDTO } from '@transaction/application/dtos/request/patchTransaction.dto';
import { TransactionResponseDTO } from '@transaction/application/dtos/transactionResponse.dto';

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
