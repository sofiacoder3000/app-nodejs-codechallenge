import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer, Consumer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor(private readonly configService: ConfigService) {
    this.kafka = new Kafka({
      clientId:
        this.configService.get<string>('KAFKA_CLIENT_ID') ||
        'transaction-service',
      brokers: [
        this.configService.get<string>('KAFKA_BROKER') || 'kafka:29092',
      ],
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'anti-fraud-group' });
  }

  async onModuleInit() {
    await this.producer.connect();
    console.log('Kafka producer connected');

    await this.consumer.connect();
    console.log('Kafka consumer connected');
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    console.log('Kafka producer disconnected');

    await this.consumer.disconnect();
    console.log('Kafka consumer disconnected');
  }

  getProducer(): Producer {
    return this.producer;
  }

  getConsumer(): Consumer {
    return this.consumer;
  }
}

export const KAFKA_TOPICS = {
  TRANSACTION_CREATED: 'transaction_created',
};
