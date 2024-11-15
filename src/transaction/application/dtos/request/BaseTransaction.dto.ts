import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { TransferType } from '@transaction/domain/enums/transfer-type.enum';

@InputType()
export class BaseTransactionDTO {
  @ApiProperty({
    description: 'Identificador externo de la cuenta de débito',
    type: String,
    example: '4d70f4df-ce2a-4249-9ed9-4db00110e56c',
  })
  @Field()
  accountExternalIdDebit: string;

  @ApiProperty({
    description: 'Identificador externo de la cuenta de crédito',
    type: String,
    example: 'cfeb71d5-b7d2-4540-bd50-c687ac1fd468',
  })
  @Field()
  accountExternalIdCredit: string;

  @ApiProperty({
    description:
      'Código del tipo de transferencia. Valores posibles: 1 - Bank Transfer, 2 - PayPal, 3 - Crypto',
    enum: TransferType,
    enumName: 'TransferType',
    default: TransferType.BANK_TRANSFER,
    example: 1,
  })
  @Field(() => TransferType, {
    description: 'Transfer type',
    defaultValue: TransferType.BANK_TRANSFER,
  })
  @IsEnum(TransferType, { message: 'transferTypeId not defined' })
  transferTypeId: TransferType;

  @ApiProperty({
    description: 'Valor de la transacción',
    type: Number,
    example: 100,
  })
  @Field()
  value: number;
}
