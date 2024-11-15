import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from '@transaction/infraestructure/services/transaction.service';
import { TransactionController } from '@transaction/infraestructure/api/controllers/transaction.controller';
import { TransactionRepository } from '@transaction/infraestructure/repositories/transaction.repository';
import { TransactionEntity } from '@transaction/infraestructure/entities/transaction.entity';
import { TransactionResolver } from '@transaction/infraestructure/api/resolvers/transaction.resolver';
import { CreateTransactionUseCase } from '@transaction/application/use-cases/create-transaction-use-case';
import { GetTransactionsUseCase } from '@transaction/application/use-cases/get-transactions-use-case';
import { UpdateTransactionUseCase } from '@transaction/application/use-cases/update-transaction-use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  providers: [
    {
      provide: 'ITransactionService',
      useClass: TransactionService,
    },
    {
      provide: 'ICreateTransactionUseCase',
      useClass: CreateTransactionUseCase,
    },
    {
      provide: 'IGetTransactionsUseCase',
      useClass: GetTransactionsUseCase,
    },
    {
      provide: 'IUpdateTransactionUseCase',
      useClass: UpdateTransactionUseCase,
    },
    {
      provide: 'ITransactionRepository',
      useClass: TransactionRepository,
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
