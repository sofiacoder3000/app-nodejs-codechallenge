import { ObjectType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class AntiFraudResponseDTO {
  @ApiProperty({
    description: 'Indicates if the transaction is valid',
    example: true,
  })
  @Field(() => Boolean, {
    description: 'Indicates if the transaction is valid',
  })
  isValid: boolean;

  @ApiProperty({
    description: 'Reason for fraud rejection, if any',
    example: 'Insufficient funds',
    nullable: true,
  })
  @Field(() => String, {
    description: 'Reason for fraud rejection, if any',
    nullable: true,
  })
  reason?: string;
}
