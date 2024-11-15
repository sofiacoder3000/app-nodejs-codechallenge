import { InputType, PartialType } from '@nestjs/graphql';
import { UpdateTransactionDTO } from '@transaction/application/dtos/request/updateTransaction.dto';

@InputType()
export class PatchTransactionDTO extends PartialType(UpdateTransactionDTO) {}
