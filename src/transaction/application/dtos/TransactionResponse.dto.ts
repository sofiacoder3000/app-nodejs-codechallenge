import { ApiProperty } from '@nestjs/swagger';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class TransactionTypeResponseDTO {
  @ApiProperty({
    description: 'Tipo de transacción',
    type: String,
  })
  @Field()
  name: string;
}

@ObjectType()
class TransactionStatusResponseDTO {
  @ApiProperty({
    description: 'Estado de la transacción',
    type: String,
  })
  @Field()
  name: string;
}

@ObjectType()
export class TransactionResponseDTO {
  @ApiProperty({
    description: 'Identificador único de la transacción',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @Field()
  transactionExternalId: string;

  @ApiProperty({
    description: 'Tipo de transacción',
    type: () => TransactionTypeResponseDTO,
  })
  @Field(() => TransactionTypeResponseDTO)
  transactionType: TransactionTypeResponseDTO;

  @ApiProperty({
    description: 'Estado de la transacción',
    type: () => TransactionStatusResponseDTO,
  })
  @Field(() => TransactionStatusResponseDTO)
  transactionStatus: TransactionStatusResponseDTO;

  @ApiProperty({
    description: 'Valor de la transacción',
    type: Number,
  })
  @Field()
  value: number;

  @ApiProperty({
    description: 'Fecha de creación de la transacción',
    type: String,
  })
  @Field()
  createdAt: Date;
}
