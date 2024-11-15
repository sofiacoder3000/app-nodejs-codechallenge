import { Test, TestingModule } from '@nestjs/testing';
import { AntiFraudResolver } from './anti-fraud.resolver';

describe('AntiFraudResolver', () => {
  let resolver: AntiFraudResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AntiFraudResolver],
    }).compile();

    resolver = module.get<AntiFraudResolver>(AntiFraudResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
