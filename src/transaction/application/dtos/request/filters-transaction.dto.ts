import { Field, InputType, PartialType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { BaseTransactionDTO } from '@transaction/application/dtos/request/base-transaction.dto';
import { TransactionStatus } from '@transaction/domain/enums/transaction-status.enum';
import { IsEnum } from 'class-validator';

@InputType()
export class FiltersTransactionDTO extends PartialType(BaseTransactionDTO) {
  @ApiProperty({
    description:
      'Estado de la transacción. Valores posibles: 1 - PENDING, 2 - APPROVED, 3 - REJECTED',
    enum: TransactionStatus,
    enumName: 'TransactionStatus',
    example: 1,
  })
  @Field(() => TransactionStatus, {
    description: 'Transaction Status',
    nullable: true,
  })
  @IsEnum(TransactionStatus, { message: 'transactionStatus not defined' })
  transactionStatus?: TransactionStatus;
}
