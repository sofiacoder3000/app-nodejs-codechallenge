import { Test, TestingModule } from '@nestjs/testing';
import { CheckFraudService } from './check-fraud.service';

describe('CheckFraudService', () => {
  let service: CheckFraudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckFraudService],
    }).compile();

    service = module.get<CheckFraudService>(CheckFraudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
