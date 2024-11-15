import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CheckTransactionDTO {
  @ApiProperty({
    description: 'Transaction ID to verify',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Field(() => String, { description: 'Transaction ID to verify' })
  transactionId: string;

  @ApiProperty({
    description: 'Transaction value',
    example: 500,
    type: Number,
  })
  @Field(() => Number, { description: 'Transaction value' })
  value: number;
}
