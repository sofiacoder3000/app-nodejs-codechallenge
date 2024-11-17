import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from '@transaction/infraestructure/api/controllers/transaction.controller';
import { TransactionService } from '@transaction/infraestructure/services/transaction.service';
import { CreateTransactionUseCase } from '@transaction/application/use-cases/create-transaction-use-case';
import { GetTransactionsUseCase } from '@transaction/application/use-cases/get-transactions-use-case';
import { UpdateTransactionUseCase } from '@transaction/application/use-cases/update-transaction-use-case';
import { TransactionProducer } from '@transaction/infraestructure/kafka/transaction-producer';
import { KafkaModule } from '@shared/kafka/kafka.module';
import { MockTransactionRepository } from '@mocks/mock-transaction.repository.mock';

describe('TransactionController', () => {
  let controller: TransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KafkaModule],
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
          provide: 'ITransactionProducer',
          useClass: TransactionProducer,
        },
        {
          provide: 'ITransactionRepository',
          useClass: MockTransactionRepository,
        },
      ],
      controllers: [TransactionController],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
