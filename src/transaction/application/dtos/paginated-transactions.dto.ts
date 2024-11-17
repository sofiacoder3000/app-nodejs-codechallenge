import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionResponseDTO } from '@transaction/application/dtos/transaction-response.dto';

@ObjectType()
export class PaginatedTransactionsDTO {
  @ApiProperty({
    description: 'Lista de transacciones paginadas',
    type: [TransactionResponseDTO],
  })
  @Field(() => [TransactionResponseDTO], {
    description: 'Lista de transacciones paginadas',
  })
  data: TransactionResponseDTO[];

  @ApiProperty({
    description: 'Total de transacciones disponibles',
    type: Number,
  })
  @Field(() => Int, {
    description: 'Total de transacciones disponibles',
  })
  totalCount: number;

  @ApiProperty({
    description: 'Número de página actual',
    type: Number,
  })
  @Field(() => Int, {
    description: 'Número de página actual',
  })
  page: number;

  @ApiProperty({
    description: 'Límite de transacciones por página',
    type: Number,
  })
  @Field(() => Int, {
    description: 'Límite de transacciones por página',
  })
  limit: number;
}
