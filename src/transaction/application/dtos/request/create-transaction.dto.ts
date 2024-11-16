import { InputType } from '@nestjs/graphql';
import { BaseTransactionDTO } from '@transaction/application/dtos/request/base-transaction.dto';

@InputType()
export class CreateTransactionDTO extends BaseTransactionDTO {}
