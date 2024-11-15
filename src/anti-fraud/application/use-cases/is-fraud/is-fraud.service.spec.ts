import { Test, TestingModule } from '@nestjs/testing';
import { IsFraudService } from '@antifraud/application/use-cases/is-fraud/is-fraud.service';

describe('IsFraudService', () => {
  let service: IsFraudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IsFraudService],
    }).compile();

    service = module.get<IsFraudService>(IsFraudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
