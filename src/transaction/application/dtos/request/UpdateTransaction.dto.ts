import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { TransactionStatus } from '@transaction/domain/enums/transaction-status.enum';
import { BaseTransactionDTO } from '@transaction/application/dtos/request/baseTransaction.dto';

@InputType()
export class UpdateTransactionDTO extends BaseTransactionDTO {
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
