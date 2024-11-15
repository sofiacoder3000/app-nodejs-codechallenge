import { UpdateTransactionDTO } from '@transaction/application/dtos/request/UpdateTransaction.dto';
import { TransactionResponseDTO } from '@transaction/application/dtos/TransactionResponse.dto';

export interface IUpdateTransactionUseCase {
  patch(
    id: string,
    updateData: Partial<UpdateTransactionDTO>,
  ): Promise<TransactionResponseDTO>;

  update(
    id: string,
    updateData: UpdateTransactionDTO,
  ): Promise<TransactionResponseDTO>;
}
