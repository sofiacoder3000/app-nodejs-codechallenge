import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from '@transaction/infraestructure/services/Transaction.service';
import { TransactionController } from '@transaction/infraestructure/api/controllers/Transaction.controller';
import { TransactionRepository } from '@transaction/infraestructure/repositories/Transaction.repository';
import { TransactionEntity } from '@transaction/infraestructure/entities/Transaction.entity';
import { TransactionResolver } from '@transaction/infraestructure/api/resolvers/Transaction.resolver';
import { CreateTransactionUseCase } from '@transaction/application/use-cases/CreateTransactionUseCase';
import { GetTransactionsUseCase } from '@transaction/application/use-cases/GetTransactionsUseCase';
import { UpdateTransactionUseCase } from '@transaction/application/use-cases/UpdateTransactionUseCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]), // Importa la entidad Transaction
  ],
  providers: [
    {
      provide: 'ITransactionService',
      useClass: TransactionService, // Implementación de Transaction.service.ts
    },
    {
      provide: 'ICreateTransactionUseCase',
      useClass: CreateTransactionUseCase, // Implementación de CreateTransactionUseCase
    },
    {
      provide: 'IGetTransactionsUseCase',
      useClass: GetTransactionsUseCase, // Implementación de CreateTransactionUseCase
    },
    {
      provide: 'IUpdateTransactionUseCase',
      useClass: UpdateTransactionUseCase, // Implementación de CreateTransactionUseCase
    },
    {
      provide: 'ITransactionRepository',
      useClass: TransactionRepository, // Implementación de Transaction.repository.ts
    },
    TransactionResolver, // Resolver GraphQL
  ],
  controllers: [TransactionController], // Controlador REST
  exports: [
    'ITransactionRepository',
    'ICreateTransactionUseCase',
    'ITransactionService',
  ],
})
export class TransactionModule {}
