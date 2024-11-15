import { Body, Controller, Post } from '@nestjs/common';
import { CheckFraudService } from '@antifraud/application/check-fraud/check-fraud.service';
import { AntiFraudResponseDTO } from '@antifraud/application/dtos/anti-fraud-response.dto';
import { CheckTransactionDTO } from '@antifraud/application/dtos/check-transaction.dto';

@Controller('anti-fraud')
export class AntiFraudController {
  constructor(private readonly checkFraudService: CheckFraudService) {}

  @Post('check')
  checkFraud(
    @Body() transactionInput: CheckTransactionDTO,
  ): Promise<AntiFraudResponseDTO> {
    return this.checkFraudService.checkTransaction(transactionInput);
  }
}
