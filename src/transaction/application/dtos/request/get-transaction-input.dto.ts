import { InputType, Field, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { FiltersTransactionDTO } from '@transaction/application/dtos/request/filters-transaction.dto';

@InputType()
export class GetTransactionsInputDTO {
  @ApiProperty({
    description: 'Filtros de transacción',
    type: FiltersTransactionDTO,
    required: false,
  })
  @Field(() => FiltersTransactionDTO, {
    nullable: true,
    description: 'Filtros de transacción',
  })
  filters?: FiltersTransactionDTO;

  @ApiProperty({
    description: 'Límite de resultados',
    type: Number,
    required: false,
    default: 10,
  })
  @Field(() => Int, {
    nullable: true,
    description: 'Límite de resultados',
    defaultValue: 10,
  })
  limit?: number;

  @ApiProperty({
    description: 'Desplazamiento de resultados',
    type: Number,
    required: false,
  })
  @Field(() => Int, {
    nullable: true,
    description: 'Desplazamiento de resultados',
  })
  offset?: number;
}
