import { registerEnumType } from '@nestjs/graphql';

export enum TransferType {
  BANK_TRANSFER = 1,
  PAYPAL = 2,
  CRYPTO = 3,
}

export const TransferTypeDescriptions = {
  [TransferType.BANK_TRANSFER]: 'Bank Transfer',
  [TransferType.PAYPAL]: 'Paypal',
  [TransferType.CRYPTO]: 'Crypto',
};

registerEnumType(TransferType, {
  name: 'TransferTypeEnum',
  description: 'Tipos de transferencia',
  valuesMap: {
    BANK_TRANSFER: {
      description: 'Bank Transfer',
    },
    PAYPAL: {
      description: 'Paypal',
    },
    CRYPTO: {
      description: 'Crypto',
    },
  },
});
