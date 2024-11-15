import { InputType } from '@nestjs/graphql';
import { BaseTransactionDTO } from '@transaction/application/dtos/request/baseTransaction.dto';

@InputType()
export class CreateTransactionDTO extends BaseTransactionDTO {}
