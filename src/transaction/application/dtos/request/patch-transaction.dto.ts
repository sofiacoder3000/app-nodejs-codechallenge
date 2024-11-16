import { InputType, PartialType } from '@nestjs/graphql';
import { UpdateTransactionDTO } from '@transaction/application/dtos/request/update-transaction.dto';

@InputType()
export class PatchTransactionDTO extends PartialType(UpdateTransactionDTO) {}
