import { CreateTransactionDTO } from '@transaction/application/dtos/request/createTransaction.dto';
import { TransactionResponseDTO } from '@transaction/application/dtos/transactionResponse.dto';
import { UpdateTransactionDTO } from '@transaction/application/dtos/request/updateTransaction.dto';
import {
  TransactionStatus,
  TransactionStatusDescriptions,
} from '@transaction/domain/enums/transaction-status.enum';
import { TransferTypeDescriptions } from '@transaction/domain/enums/transfer-type.enum';
import { Transaction } from '@transaction/domain/models/transaction';

export class TransactionMapper {
  static toDomain(dto: Partial<CreateTransactionDTO>): Transaction {
    return new Transaction({
      accountExternalIdDebit: dto.accountExternalIdDebit,
      accountExternalIdCredit: dto.accountExternalIdCredit,
      transferTypeId: dto.transferTypeId,
      transactionStatus: TransactionStatus.PENDING,
      value: dto.value,
      createdAt: Date.now(),
    });
  }

  static toTransactionResponseDTO(
    transaction: Transaction,
  ): TransactionResponseDTO {
    return {
      transactionExternalId: transaction.transactionExternalId,
      transactionType: {
        name: TransferTypeDescriptions[transaction.transferTypeId],
      },
      transactionStatus: {
        name: TransactionStatusDescriptions[transaction.transactionStatus],
      },
      value: parseFloat(transaction.value.toString()),
      createdAt: new Date(parseInt(transaction.createdAt.toString())),
    };
  }

  static mapUpdateDTOToTransaction(
    id: string,
    updateDTO: Partial<UpdateTransactionDTO>,
  ): Transaction {
    const transaction = {} as Transaction;

    transaction.transactionExternalId = id;
    if (updateDTO.accountExternalIdDebit !== undefined) {
      transaction.accountExternalIdDebit = updateDTO.accountExternalIdDebit;
    }

    if (updateDTO.accountExternalIdCredit !== undefined) {
      transaction.accountExternalIdCredit = updateDTO.accountExternalIdCredit;
    }

    if (updateDTO.transferTypeId !== undefined) {
      transaction.transferTypeId = updateDTO.transferTypeId;
    }

    if (updateDTO.transactionStatus !== undefined) {
      transaction.transactionStatus = updateDTO.transactionStatus;
    }

    if (updateDTO.value !== undefined) {
      transaction.value = updateDTO.value;
    }

    return transaction;
  }

  static mapPatchDTOToTransaction(
    id: string,
    updateDTO: Partial<UpdateTransactionDTO>,
  ): Transaction {
    const transaction = {} as Transaction;

    transaction.transactionExternalId = id;
    if (updateDTO.accountExternalIdDebit !== undefined) {
      transaction.accountExternalIdDebit = updateDTO.accountExternalIdDebit;
    }

    if (updateDTO.accountExternalIdCredit !== undefined) {
      transaction.accountExternalIdCredit = updateDTO.accountExternalIdCredit;
    }

    if (
      updateDTO.transferTypeId !== undefined &&
      updateDTO.transferTypeId !== null
    ) {
      transaction.transferTypeId = updateDTO.transferTypeId;
    }

    if (
      updateDTO.transactionStatus !== undefined &&
      updateDTO.transactionStatus !== null
    ) {
      transaction.transactionStatus = updateDTO.transactionStatus;
    }

    if (updateDTO.value !== undefined) {
      transaction.value = updateDTO.value;
    }

    return transaction;
  }
}
