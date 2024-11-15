import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AntiFraudResponseDTO } from '@antifraud/application/dtos/anti-fraud-response.dto';
import { CheckTransactionDTO } from '@antifraud/application/dtos/check-transaction.dto';
import { IAntifraudService } from '@antifraud/application/services/anti-fraud.service.interface';

@Controller('anti-fraud')
export class AntiFraudController {
  constructor(
    @Inject('IAntifraudService')
    private readonly antifraudService: IAntifraudService,
  ) {}

  @Post('check')
  checkFraud(
    @Body() transactionInput: CheckTransactionDTO,
  ): AntiFraudResponseDTO {
    return this.antifraudService.checkFraud(transactionInput);
  }
}
