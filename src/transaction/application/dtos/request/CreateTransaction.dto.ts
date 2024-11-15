import { InputType } from '@nestjs/graphql';
import { BaseTransactionDTO } from '@transaction/application/dtos/request/BaseTransaction.dto';

@InputType()
export class CreateTransactionDTO extends BaseTransactionDTO {}
