import { Test, TestingModule } from '@nestjs/testing';
import { AntiFraudResolver } from '@antifraud/infrastructure/resolvers/anti-fraud.resolver';
import { AntifraudService } from '@antifraud/infrastructure/services/anti-fraud.service';
import { CheckFraudService } from '@antifraud/application/use-cases/check-fraud/check-fraud.service';
import { IsFraudService } from '@antifraud/application/use-cases/is-fraud/is-fraud.service';

describe('AntiFraudResolver', () => {
  let resolver: AntiFraudResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AntiFraudResolver,
        {
          provide: 'IAntifraudService',
          useClass: AntifraudService,
        },
        {
          provide: 'IIsFraudService',
          useClass: IsFraudService,
        },
        {
          provide: 'ICheckFraudService',
          useClass: CheckFraudService,
        },
      ],
    }).compile();

    resolver = module.get<AntiFraudResolver>(AntiFraudResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
