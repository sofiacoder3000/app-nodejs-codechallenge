import { Test, TestingModule } from '@nestjs/testing';
import { AntiFraudController } from '@antifraud/infrastructure/controllers/anti-fraud.controller';
import { AntifraudService } from '@antifraud/infrastructure/services/anti-fraud.service';
import { CheckFraudService } from '@antifraud/application/use-cases/check-fraud/check-fraud.service';
import { IsFraudService } from '@antifraud/application/use-cases/is-fraud/is-fraud.service';

describe('AntiFraudController', () => {
  let controller: AntiFraudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
      controllers: [AntiFraudController],
    }).compile();

    controller = module.get<AntiFraudController>(AntiFraudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
