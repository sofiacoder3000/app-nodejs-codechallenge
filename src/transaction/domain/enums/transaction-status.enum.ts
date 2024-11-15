import { registerEnumType } from '@nestjs/graphql';

export enum TransactionStatus {
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export const TransactionStatusDescriptions = {
  [TransactionStatus.PENDING]: 'Pending',
  [TransactionStatus.APPROVED]: 'Approved',
  [TransactionStatus.REJECTED]: 'Rejected',
};

registerEnumType(TransactionStatus, {
  name: 'TransferType',
  description: 'Tipos de transferencia',
  valuesMap: {
    PENDING: {
      description: 'Transferencia pendiente de revisión',
    },
    APPROVED: {
      description: 'Transferencia aprovada',
    },
    REJECTED: {
      description: 'Transferencia rechazada',
    },
  },
});
