import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  HttpStatus,
  Put,
  Patch,
  Param,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTransactionDTO } from '@transaction/application/dtos/request/CreateTransaction.dto';
import { TransactionResponseDTO } from '@transaction/application/dtos/TransactionResponse.dto';
import { UpdateTransactionDTO } from '@transaction/application/dtos/request/UpdateTransaction.dto';
import { ITransactionService } from '@transaction/application/services/Transaction.service.interface';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(
    @Inject('ITransactionService')
    private readonly transactionService: ITransactionService,
  ) {}

  @Post()
  @ApiBody({
    description: 'Crea una nueva transacción',
    type: CreateTransactionDTO,
    examples: {
      example1: {
        summary: 'Ejemplo de una transferencia bancaria',
        description: 'Ejemplo de request para una transferencia bancaria.',
        value: {
          accountExternalIdDebit: '550e8400-e29b-41d4-a716-446655440000',
          accountExternalIdCredit: '550e8400-e29b-41d4-a716-446655440001',
          transferTypeId: 1,
          value: 120,
        },
      },
      example2: {
        summary: 'Ejemplo de un pago con PayPal',
        description: 'Ejemplo de request para un pago usando PayPal.',
        value: {
          accountExternalIdDebit: '123e4567-e89b-12d3-a456-426614174002',
          accountExternalIdCredit: '123e4567-e89b-12d3-a456-426614174003',
          transferTypeId: 2,
          value: 50.5,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Transacción creada exitosamente.',
    content: {
      'application/json': {
        example: {
          transactionExternalId: 'e12b8d01-bf11-4a80-ad91-1cf114283287',
          transactionType: {
            name: 'Bank Transfer',
          },
          transactionStatus: {
            name: 'Pending',
          },
          value: '120',
          createdAt: '2024-11-14T10:00:00Z',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Solicitud inválida. Verifica los datos enviados.',
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          message: [
            'amount must be a positive number',
            'accountExternalIdDebit must be a valid UUID',
          ],
          error: 'Bad Request',
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno del servidor. Intente nuevamente más tarde.',
    content: {
      'application/json': {
        example: {
          statusCode: 500,
          message: 'Error interno del servidor',
          error: 'Internal Server Error',
        },
      },
    },
  })
  async create(
    @Body() createTransactionDto: CreateTransactionDTO,
  ): Promise<TransactionResponseDTO> {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de transacciones obtenida exitosamente.',
    type: TransactionResponseDTO,
    isArray: true,
    content: {
      'application/json': {
        example: [
          {
            transactionExternalId: 'e12b8d01-bf11-4a80-ad91-1cf114283287',
            transactionType: {
              name: 'Bank Transfer',
            },
            transactionStatus: {
              name: 'Pending',
            },
            value: '120',
            createdAt: '2024-11-14T10:00:00Z',
          },
        ],
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno del servidor. Intente nuevamente más tarde.',
    content: {
      'application/json': {
        example: {
          statusCode: 500,
          message: 'Error interno del servidor',
          error: 'Internal Server Error',
        },
      },
    },
  })
  async get(): Promise<TransactionResponseDTO[]> {
    return this.transactionService.getTransactions();
  }

  @Get(':id')
  @ApiNotFoundResponse({
    description: 'No se encontró la transacción.',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message:
            'Transaction with ID 32a1c938-4882-4dcd-9746-f57d9c96b3d8 not found',
          error: 'Not Found',
        },
      },
    },
  })
  async getById(@Param('id') id: string): Promise<TransactionResponseDTO> {
    return this.transactionService.getTransaction(id);
  }

  @Patch('/:id')
  @ApiBody({
    description: 'Modifica algunos campos de transacción',
    type: UpdateTransactionDTO,
    examples: {
      example1: {
        summary: 'Ejemplo de cambio de estado',
        description:
          'Ejemplo de request para cambiar el estado de la transacción a aprovada.',
        value: {
          transactionStatus: 2,
        },
      },
      example2: {
        summary: 'Ejemplo de cambio de tipo de transferencia y monto',
        description:
          'Ejemplo de request para un cambio de tipo de transferencia y monto.',
        value: {
          transferTypeId: 2,
          value: 45.7,
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'No se encontró la transacción.',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message:
            'Transaction with ID 32a1c938-4882-4dcd-9746-f57d9c96b3d8 not found',
          error: 'Not Found',
        },
      },
    },
  })
  async patch(
    @Param('id') id: string,
    @Body() input: Partial<UpdateTransactionDTO>,
  ): Promise<TransactionResponseDTO> {
    return this.transactionService.patchTransaction(id, input);
  }

  @Put('/:id')
  @ApiNotFoundResponse({
    description: 'No se encontró la transacción.',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message:
            'Transaction with ID 32a1c938-4882-4dcd-9746-f57d9c96b3d8 not found',
          error: 'Not Found',
        },
      },
    },
  })
  async put(
    @Param('id') id: string,
    @Body() input: UpdateTransactionDTO,
  ): Promise<TransactionResponseDTO> {
    return this.transactionService.updateTransaction(id, input);
  }
}
