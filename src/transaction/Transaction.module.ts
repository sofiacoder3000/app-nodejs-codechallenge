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
import { TransactionProducer } from '@transaction/infraestructure/kafka/transaction-producer';

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
    {
      provide: 'ITransactionProducer',
      useClass: TransactionProducer,
    },
    TransactionResolver, // Resolver GraphQL
  ],
  controllers: [TransactionController], // Controlador REST
  exports: [
    'ITransactionRepository',
    'ICreateTransactionUseCase',
    'IGetTransactionsUseCase',
    'IUpdateTransactionUseCase',
    'ITransactionService',
  ],
})
export class TransactionModule {}
