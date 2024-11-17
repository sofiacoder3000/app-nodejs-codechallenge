import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaService } from '@shared/kafka/kafka.service';

@Module({
  imports: [ConfigModule],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
